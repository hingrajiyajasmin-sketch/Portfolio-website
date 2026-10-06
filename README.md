# Portfolio website

A simple responsive portfolio starter using plain HTML, CSS, and JavaScript. No build step or package installation is required.

## Structure

```text
Portfolio-website/
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/favicon.svg
│   └── fonts/
├── .gitignore
└── README.md
```

## Run locally

From the repository root:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

`index.html` is self-contained: styles, JavaScript, the handwritten font, and illustrations are embedded so it also works when opened directly or when a preview cannot load sibling asset files.

Edit the HTML normally. After editing `assets/css/style.css`, `assets/js/main.js`, or illustration files, refresh the embedded copies:

```sh
python3 scripts/sync-inline-assets.py
```

Then reload the page. No third-party packages are needed. The sync script is optional when only editing HTML text.

## Before publishing

- Replace the placeholder About, Projects, and Contact content with your information.
- Update the page title, description, and matching Open Graph and Twitter metadata.
- Add a canonical link in the head using your actual public URL.
- Replace `https://example.com/` in `sitemap.xml` with your public URL and add its sitemap URL to `robots.txt`.
- Add absolute `og:url`, `og:image`, and `twitter:image` metadata once your domain and social preview image are available.
- Deploy the repository root to a static hosting provider using HTTPS.

The header and hero follow the supplied Sai Tharun reference video: centered typography, orange accents, a rotating green orbit, and fading character illustrations. The four WebP illustrations were cropped from the supplied recording; replace them with original high-resolution assets if available. The reference name and job title are sample content to personalize. The Resume button opens a placeholder dialog until a resume is supplied.

This starter includes semantic sections, a single main heading, responsive styles, keyboard focus states, a skip link, and reduced-motion support.

## Contact section

The contact section recreates the supplied screenshot with a three-line headline, pill-shaped email button, lavender contact icons, a handwritten note, arrow, and seated character illustration. `assets/images/contact-character.png` is a generated illustration based on the supplied reference. The layout stacks on mobile.

The email address, city, and featured badge reproduce reference content and should be personalized before deployment. The email links open the user's mail application; they do not send messages automatically. LinkedIn and Resume open placeholder dialogs until real profile and resume destinations are supplied. The contact Resume button and header Resume button share the same dialog.
