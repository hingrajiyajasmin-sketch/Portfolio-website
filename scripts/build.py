"""Refresh static project cards and embedded JSON data. No asset bundling."""
import json
import re
from pathlib import Path

from portfolio_catalog import render_catalog

ROOT = Path(__file__).resolve().parents[1]


def write_json_script(html, element_id, data):
    payload = json.dumps(data, ensure_ascii=False, indent=2).replace('<', r'\u003c')
    tag = f'<script id="{element_id}" type="application/json">\n{payload}\n    </script>'
    pattern = rf'<script id="{element_id}"[^>]*>.*?</script>'
    if re.search(pattern, html, re.S):
        return re.sub(pattern, lambda _: tag, html, count=1, flags=re.S)
    return html.replace('    <script src="assets/js/global.js" defer></script>',
                        f'    {tag}\n    <script src="assets/js/global.js" defer></script>')


def main():
    projects = json.loads((ROOT / 'assets/data/portfolio-projects.json').read_text())
    toolkit = json.loads((ROOT / 'assets/data/toolkit.json').read_text())
    for name in ('index.html', 'portfolio.html', 'contact.html'):
        page = ROOT / name
        html = page.read_text()
        if name == 'contact.html':
            settings = json.loads((ROOT / 'assets/data/contact.json').read_text())
            html = write_json_script(html, 'contact-settings', settings)
        elif name == 'portfolio.html':
            html = render_catalog(html, ROOT)
        else:
            featured_ids = set(re.findall(r'data-project="([^"]+)"', html))
            featured = [project for project in projects if project['id'] in featured_ids]
            if featured_ids != {project['id'] for project in featured}:
                raise ValueError('A landing-page project is missing from the catalog.')
            html = write_json_script(html, 'portfolio-catalog', featured)
            html = write_json_script(html, 'toolkit-data', toolkit)
        resume = ROOT / 'assets/documents/jasmin-hingrajiya-resume.pdf'
        if resume.is_file():
            html = re.sub(
                r'<(?:button|a) class="resume-download"[^>]*>(.*?)</(?:button|a)>',
                lambda match: '<a class="resume-download" href="assets/documents/jasmin-hingrajiya-resume.pdf" download="Jasmin-Hingrajiya-Resume.pdf">' + match[1] + '</a>',
                html, flags=re.S)
        else:
            html = re.sub(
                r'<(?:button|a) class="resume-download"[^>]*>(.*?)</(?:button|a)>',
                lambda match: '<button class="resume-download" type="button" disabled title="Resume PDF has not been added yet" aria-label="Resume download unavailable until PDF is added">' + match[1] + '</button>',
                html, flags=re.S)
        page.write_text(html)
        print(f'Updated {name} project data.')


if __name__ == '__main__':
    main()
