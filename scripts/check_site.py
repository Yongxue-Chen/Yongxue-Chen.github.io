#!/usr/bin/env python3
"""Deterministic checks for the generated static site."""

from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class ReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.references: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        attribute = "href" if tag in {"a", "link"} else "src" if tag in {"img", "script", "source"} else None
        if attribute and values.get(attribute):
            self.references.append(values[attribute] or "")


def target_for(root: Path, reference: str) -> Path | None:
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc or reference.startswith(("mailto:", "tel:", "data:")):
        return None
    path = unquote(parsed.path)
    if not path or path == "/":
        return root / "index.html"
    target = root / path.lstrip("/")
    if path.endswith("/"):
        target /= "index.html"
    return target


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
    required = [root / "index.html", root / "projects/index.html", root / "publications/index.html", root / "cv/index.html", root / "404.html"]
    failures = [f"Missing required page: {path.relative_to(root)}" for path in required if not path.is_file()]

    for page in root.rglob("*.html"):
        parser = ReferenceParser()
        parser.feed(page.read_text(encoding="utf-8"))
        for reference in parser.references:
            target = target_for(root, reference)
            if target is not None and not target.exists():
                failures.append(f"Broken local reference in {page.relative_to(root)}: {reference}")

    sitemap = (root / "sitemap.xml").read_text(encoding="utf-8")
    if "/blog/" in sitemap:
        failures.append("Template blog URLs remain in sitemap.xml")

    generated = "\n".join(path.read_text(encoding="utf-8") for path in required if path.is_file())
    for forbidden in ("Displaying External Posts on Your al-folio Blog", "Google Gemini updates"):
        if forbidden in generated:
            failures.append(f"Template content remains in generated pages: {forbidden}")
    if not re.search(r'<meta[^>]+property=["\']og:title["\']', generated, re.IGNORECASE):
        failures.append("Open Graph title metadata is missing")

    if failures:
        print("\n".join(f"ERROR: {failure}" for failure in failures), file=sys.stderr)
        return 1
    print("Generated site checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
