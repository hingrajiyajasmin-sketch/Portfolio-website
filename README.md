# Portfolio website

A simple responsive portfolio starter using plain HTML, CSS, and JavaScript. No build step or package installation is required.

## Structure

```text
Portfolio-website/
├── index.html
├── portfolio.html
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

`index.html` and `portfolio.html` are self-contained: styles, JavaScript, the handwritten font, and illustrations are embedded so it also works when opened directly or when a preview cannot load sibling asset files.

Edit the HTML normally. After editing `assets/css/style.css`, `assets/js/main.js`, or illustration files, refresh the embedded copies:

```sh
python3 scripts/sync-inline-assets.py
```

Then reload the page. No third-party packages are needed. The sync script is optional when only editing HTML text.

## Before publishing

- Personalize the sample About copy, concept projects, work timeline, toolkit, and reference contact information.
- Update the page title, description, and matching Open Graph and Twitter metadata.
- Add a canonical link in the head using your actual public URL.
- Replace `https://example.com/` in `sitemap.xml` with your public URL and add its sitemap URL to `robots.txt`.
- Add absolute `og:url`, `og:image`, and `twitter:image` metadata once your domain and social preview image are available.
- Deploy the repository root to a static hosting provider using HTTPS.

The header and hero follow the supplied Sai Tharun reference video: centered typography, orange accents, a rotating green orbit, and sequential character fades. The four illustrations appear one at a time in this order: thinking, writing, laptop, detail. Each gets a 4-second slot: 0.4 seconds fading in, 2.2 seconds fully visible, 0.4 seconds fading out, and a 1-second empty gap. After the four individual appearances, the diagonal pairs appear: thinking with detail (top left + bottom right), then writing with laptop (bottom left + top right). Each pair uses the same timing and 1-second gap. This full 24-second sequence repeats, returning to individual appearances, with subtle vertical movement and an aligned orbit trail. Banner motion pauses off screen and when the browser tab is hidden; reduced-motion preferences show only the thinking illustration in a static composition. The four WebP illustrations were cropped from the supplied recording; replace them with original high-resolution assets if available. The reference name and job title are sample content to personalize. The Resume button opens a placeholder dialog until a resume is supplied.

This starter includes semantic sections, a single main heading, responsive styles, keyboard focus states, a skip link, and reduced-motion support.

## Contact section

The contact section recreates the supplied screenshot with a three-line headline, pill-shaped email button, lavender contact icons, a handwritten note, arrow, and seated character illustration. `assets/images/contact-character.png` is a generated illustration based on the supplied reference. The layout stacks on mobile.

The email address, city, and featured badge reproduce reference content and should be personalized before deployment. The email links open the user's mail application; they do not send messages automatically. LinkedIn and Resume open placeholder dialogs until real profile and resume destinations are supplied. The contact Resume button and header Resume button share the same dialog.

## Footer

The footer follows the supplied reference: a warm gray background, name and automatically updated copyright year, centered purple handwritten signature and smiley, and a circular Back to top control. On mobile, the signature moves to a second row. Back to top uses a native anchor to the hero, with smooth scrolling unless reduced motion is enabled.

## Landing-page sections

The complete page follows this order: header and animated hero, About, Progress, Portfolio, Job experience, Tech stack, Contact, and Footer.

- About combines an editorial introduction with a layered Polaroid collage, a generated designer illustration, and floating notes.
- The way I work shows four simple steps together: Research & Discovery, Prototype, UI Design, and Delivery. Each has its own icon, title, and short description. The layout uses four columns on desktop, two on tablet, and a compact vertical list on mobile.
- Portfolio features a full-width case study and two supporting cards with CSS-drawn interface previews, mouse-following preview cues, and project detail dialogs. All three projects stay visible without category tabs. Both the preview and arrow button open each project; View portfolio opens the dedicated `portfolio.html` page. These are design concepts, not shipped client work or connected apps. Replace the preview markup and descriptions with real work when available.
- Job experience uses a light section with three simple role rows, subtle dividers, pastel company initials, and visible descriptions. Reference and sample roles remain labeled; replace them with your actual companies, dates, and contributions.
- Tech stack arranges eight sample tools around a circular creative playground. Click a tool to update the adjacent inspector with its icon, role, and description. Personalize the selection to reflect your actual skills.

Animations respect reduced-motion preferences. Section content remains visible without JavaScript; project dialogs and toolkit selection require JavaScript. All illustrations, fonts, styles, and scripts are embedded in both HTML pages by the existing sync script, so the page remains portable. No external asset requests or packages are required at runtime.

The About illustration (`assets/images/about-designer.png`) was generated to match the character style of the contact section. Animation behavior follows [reduced-motion guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

## Portfolio page

`portfolio.html` presents the same three concepts in a separate, simple gallery: an editorial heading, alternating artwork and project descriptions, subtle hover motion, project dialogs, a contact link, and the shared footer. Cards stack on mobile. The landing page’s View portfolio button links here, and Home and Contact navigate back to the landing page. No tabs or filters are used.

The sync script updates both HTML pages. Keep the complete folder when downloading so navigation between the pages works; each page embeds its own styles, font, and script.
