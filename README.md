# Jasmin Hingrajiya — Portfolio

A responsive portfolio built with plain HTML, CSS, and JavaScript. No package installation or framework is required.

## Structure

```text
index.html                      Landing page
portfolio.html                  Industry portfolio gallery
contact.html                    Contact page with LinkedIn and project prompts
assets/
  css/
    global.css                  Shared foundations and components
    home.css                    Landing-page sections and banner motion
    portfolio.css               Gallery, filters, and project artwork
    contact.css                 Contact page layout and illustration
  js/
    global.js                   Reveals, dialogs, preview cues, and year
    home.js                     Navigation, banner, resume, and toolkit
    portfolio.js                Industry filtering and pagination
  data/
    portfolio-projects.json      Editable project catalog
    toolkit.json                Sample software descriptions
  fonts/                        Local DM Sans variable fonts and license
  images/                       Local illustrations and favicon
scripts/
  build.py                      Refresh project markup and JSON data
  portfolio_catalog.py          Catalog renderer
  export-standalone.py           Optional self-contained preview export
```

Each page loads `global.css` and `global.js`, followed by only its own CSS and JavaScript. Scripts use `defer`, scoped initialization functions, and native buttons/dialogs. Styles contain the current design's required selectors and responsive states; retired section styles and overridden declarations have been removed. HTML references local images and fonts instead of embedding large asset copies.

## Run locally

From the repository folder:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open `index.html` or `portfolio.html` through your local server. The complete downloaded folder can also be opened directly in a browser. Keep both HTML pages and the `assets` folder together.

Edit CSS and JavaScript directly and reload the browser. No synchronization or build is needed for those changes.

## Edit portfolio content

Update `assets/data/portfolio-projects.json`, then run:

```sh
python3 scripts/build.py
```

Every project needs a unique `id`, `brand`, `title`, `industry`, `discipline`, `summary`, `idea`, `direction`, `sample`, and `art`. An optional `image` field can point to a local project cover, such as `assets/images/project-cover.webp`. It replaces the CSS-drawn preview. Industry filters and counts are generated automatically from the catalog.

The gallery shows two staggered cards per row on desktop and one per row on mobile. It initially displays 12 projects; Load more adds another 12. Industry filtering, reset, dialogs, and keyboard focus work together. Without JavaScript, all project previews remain visible.

The current catalog contains **24 labeled demo concepts across 8 sample industries**, pending real project content. Set `sample` to false only for actual work. The landing page's featured project IDs must also exist in the catalog. Project markup and dialog data are generated together, so runtime JavaScript never fetches a data file.

Edit `assets/data/toolkit.json` and run the same command to refresh software descriptions. The toolkit remains a sample until the tool list is confirmed.

## Standalone previews

Generate self-contained copies without changing the source pages:

```sh
python3 scripts/export-standalone.py
```

Outputs go to the ignored `dist/standalone/` folder. Keep both exported pages together for navigation. To choose another output folder, pass `--output /path/to/folder`.

## Profile and interactions

The user supplied Jasmin Hingrajiya's bio, Senior UI/UX & Web Designer title, 7+ years of experience, Ahmedabad location, and [LinkedIn profile](https://www.linkedin.com/in/hingrajiya-jasmin-17271a164/). These details appear in the banner, About, experience summary, contact, and SEO metadata. No company names, employment dates, email address, or software proficiency were invented. Resume remains a placeholder until a file is supplied. Reference-style illustrations are decorative artwork.

The banner repeats four individual appearances followed by two diagonal pairs over 24 seconds, with a one-second gap between appearances. It pauses off screen and in hidden browser tabs. Animations respect reduced-motion preferences. Sections remain visible without JavaScript.

The four process cards stay visible without tabs. Their progress bars fill sequentially over a 16-second loop, with a soft highlight on the current step. The animation pauses off screen and in hidden tabs; reduced-motion preferences display static completed bars.

## Before publishing

- Replace demo projects and confirm the software toolkit.
- Add your resume and any public contact email you want displayed.
- Replace `https://example.com/` in `sitemap.xml` with your domain; add the sitemap URL to `robots.txt`.
- Add canonical URLs and absolute social preview image URLs after choosing a domain.
- Deploy the repository root to a static host using HTTPS.

Typography uses locally hosted DM Sans for all site text, with regular and italic variable faces. The global stylesheet defines the body, caption, and heading size tokens; page styles apply them responsively. No external font service is required.

The Contact page links to the provided LinkedIn profile and suggests useful project details to share. No contact email or form backend has been supplied.
