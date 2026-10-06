"""Keep the HTML pages portable while preserving editable asset files."""
from pathlib import Path
import base64
import mimetypes
import re

ROOT = Path(__file__).resolve().parents[1]
css = (ROOT / "assets/css/style.css").read_text()
font = base64.b64encode((ROOT / "assets/fonts/Kalam-Regular.ttf").read_bytes()).decode()
css = css.replace("../fonts/Kalam-Regular.ttf", "data:font/ttf;base64," + font)
style = '<style id="portfolio-styles">\n' + css + '</style>'
script = '<script id="portfolio-script">\n' + (ROOT / "assets/js/main.js").read_text() + '</script>'

def embed_image(match):
    tag = match.group(0)
    existing = re.search(r'data-asset="([^"]+)"', tag)
    if existing:
        path = existing.group(1)
    else:
        path = re.search(r'src="([^"]+)"', tag).group(1)
        tag = tag.replace('<img ', '<img data-asset="' + path + '" ', 1)
    encoded = base64.b64encode((ROOT / path).read_bytes()).decode()
    mime = mimetypes.guess_type(path)[0] or 'application/octet-stream'
    return re.sub(r'src="[^"]+"', lambda _: 'src="data:' + mime + ';base64,' + encoded + '"', tag)

favicon = base64.b64encode((ROOT / "assets/images/favicon.svg").read_bytes()).decode()
for name in ("index.html", "portfolio.html"):
    page = ROOT / name
    html = page.read_text()
    if '<style id="portfolio-styles">' in html:
        html = re.sub(r'<style id="portfolio-styles">.*?</style>', lambda _: style, html, flags=re.S)
    else:
        html = html.replace('<link rel="stylesheet" href="assets/css/style.css">', style)
    if '<script id="portfolio-script">' in html:
        html = re.sub(r'<script id="portfolio-script">.*?</script>', lambda _: script, html, flags=re.S)
    else:
        html = html.replace('    <script src="assets/js/main.js" defer></script>\n', '')
        html = html.replace('  </body>', '    ' + script + '\n  </body>')
    html = re.sub(r'<img\b[^>]+>', embed_image, html)
    html = re.sub(r'(<link rel="icon" href=")[^"]+(" type="image/svg\+xml">)',
                  lambda m: m.group(1) + 'data:image/svg+xml;base64,' + favicon + m.group(2), html)
    page.write_text(html)
    print(f"Updated {name} with embedded styles, scripts, font, and illustrations.")
