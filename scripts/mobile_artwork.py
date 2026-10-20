"""Export native app screens in device frames using the same renderer as the site.

Requires the environment's Playwright and Chromium only when refreshing artwork.
Normal development and scripts/build.py have no browser dependency.
"""
import argparse
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import threading

ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--project', help='Export one project ID instead of all mobile projects.')
    args = parser.parse_args()
    projects = [p for p in json.loads((ROOT / 'assets/data/portfolio-projects.json').read_text())
                if p.get('mobilePresentation') and (not args.project or p['id'] == args.project)]
    if not projects:
        parser.error('No matching mobile projects.')
    from playwright.sync_api import sync_playwright

    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
            page = browser.new_page(viewport={'width': 1200, 'height': 800}, device_scale_factor=1,
                                    reduced_motion='reduce')
            page.set_content(f'''<!doctype html><html><head>
              <base href="http://127.0.0.1:{server.server_port}/">
              <link rel="stylesheet" href="assets/css/global.css">
              <link rel="stylesheet" href="assets/css/mobile-projects.css">
              <script src="assets/js/mobile-projects.js"></script>
              </head><body class="mobile-export-page"></body></html>''')
            page.wait_for_function('Boolean(window.MobileProjectPresentation)')
            page.evaluate('document.fonts.ready')
            for project in projects:
                page.evaluate('project => document.body.replaceChildren(MobileProjectPresentation.renderCover(project))', project)
                page.evaluate('Promise.all([...document.images].map(image => image.decode()))')
                # Each interface is downsampled from the supplied PNG, never enlarged.
                geometry = page.locator('.mobile-hardware').evaluate_all('''devices => devices.map(device => ({
                    native: Number(device.dataset.nativeWidth),
                    rendered: device.querySelector('.mobile-screen-window').getBoundingClientRect().width,
                    bottom: device.getBoundingClientRect().bottom
                }))''')
                if any(item['rendered'] > item['native'] or item['bottom'] > 744 for item in geometry):
                    raise ValueError(f'{project["id"]}: screen enlargement or cover clipping: {geometry}')
                output = ROOT / project['image']
                output.parent.mkdir(parents=True, exist_ok=True)
                page.locator('.mobile-cover').screenshot(path=str(output), animations='disabled')
                print(f'Exported {project["id"]}: 1200 × 800, original screen pixels retained.')
            browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
