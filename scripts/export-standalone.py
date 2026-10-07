"""Export self-contained previews without changing the clean source pages."""
import argparse
import base64
import mimetypes
import re
from pathlib import Path

from build import ROOT, main as build


def data_url(path):
    mime = mimetypes.guess_type(path)[0] or 'application/octet-stream'
    return f'data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}'


def export(output):
    output.mkdir(parents=True, exist_ok=True)
    for name in ('index.html', 'portfolio.html'):
        html = (ROOT / name).read_text()

        def embed_css(match):
            css_path = ROOT / match[1]
            css = css_path.read_text()
            css = re.sub(r'url\([\'"]?(\.\./fonts/[^\'"\)]+)[\'"]?\)',
                         lambda m: f'url("{data_url((css_path.parent / m[1]).resolve())}")', css)
            return f'<style>\n{css}</style>'

        html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', embed_css, html)
        html = re.sub(r'<script src="([^"]+)" defer></script>',
                      lambda m: '<script>\n' + (ROOT / m[1]).read_text() + '</script>', html)
        html = re.sub(r'(<img\b[^>]*\bsrc=")([^"]+)(")',
                      lambda m: m[1] + data_url(ROOT / m[2]) + m[3], html)
        html = html.replace('href="assets/images/favicon.svg"',
                            f'href="{data_url(ROOT / "assets/images/favicon.svg")}"')
        (output / name).write_text(html)
        print(f'Exported {output / name}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'dist/standalone')
    args = parser.parse_args()
    build()
    export(args.output)
