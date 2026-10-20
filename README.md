# Jasmin Hingrajiya — Portfolio

A responsive portfolio built with plain HTML, CSS, and JavaScript. No package installation or framework is required.

## Structure

```text
index.html                      Landing page
portfolio.html                  Website design project gallery
contact.html                    Contact page with LinkedIn and project prompts
assets/
  css/
    global.css                  Shared foundations and components
    home.css                    Landing-page sections and banner motion
    portfolio.css               Gallery, filters, and project artwork
    contact.css                 Contact page layout and illustration
  js/
    global.js                   Reveals, dialogs, preview cues, and year
    device-previews.js          Original-design scrolling inside desktop monitors
    home.js                     Banner, process, and toolkit
    portfolio.js                Category filtering and pagination
    contact.js                  Form validation, message copy, and delivery settings
  data/
    portfolio-projects.json      Editable project catalog
    toolkit.json                Sample software descriptions
    contact.json                Contact form email or submission endpoint
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

Every project needs a unique `id`, `brand`, `title`, `industry`, `discipline`, `summary`, `idea`, `direction`, `sample`, `art`, and `category`. The `image` field points to a local device cover, `imageAlt` describes the presentation, and `originalDesign` links to the full-page supplied design. Optional `scope` and `outcome` fields provide project-specific context in the preview. Only add a `website` URL when the project’s live address is confirmed.

The gallery uses two columns on desktop and one on mobile. The catalog contains **24 supplied projects: 11 website designs and 13 app projects**. The **Mobile App** tab shows all 13 app projects, with 40 original screens presented in graphite smartphone and tablet frames. Each app has its own concept, visual direction, and design focus. The detail view supports scrolling inside long screens and swiping between screens on small displays. HomeWorth retains its tablet workspace format. Original PNG exports are preserved byte for byte, with a full-resolution source link in every preview. See `docs/mobile-app-presentation.md` for artwork, source fidelity, and QA details.

The home page still features DevsTree, Mint & Oak, and EasyProps. The 11 website projects retain their front-facing desktop monitor presentation and supplied JPEG screens. These previews scroll at one visible screenful per four seconds, with pause controls, offscreen pausing, and static original screens for reduced motion or disabled JavaScript. See `docs/portfolio-presentation.md` for their geometry and maintenance details. Games and logo tabs remain empty until matching work is supplied.

All initially displays 12 projects, with Load more revealing the rest. Mobile App shows all 13 projects immediately; Website Design shows its 11. Category filtering, reset, accessible project previews, and keyboard focus work together. Without JavaScript, all projects remain visible.

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

The Contact page sends enquiries to `hingrajiyajasmin@gmail.com` through FormSubmit. Visitors stay on the page with JavaScript enabled, with required name, email, project idea, and message fields, validation, a sending state, duplicate-submit protection, a honeypot, and success/error feedback. Without JavaScript, the form posts to FormSubmit’s submission page. On the first genuine enquiry, FormSubmit sends an activation email to the recipient; click its confirmation link to enable delivery, then submit another enquiry to verify receipt. No API key or server is required. Request acceptance is displayed only after a successful service response; inbox delivery depends on activation and the provider.

Contact destinations are configured in `assets/data/contact.json`: `endpoint` is the native HTTPS submission URL, `ajaxEndpoint` enables in-page JSON POST submission, and `email` supplies the direct-email fallback. Run `python3 scripts/build.py` after changing them. The home contact button opens `contact.html#contact-form`.

Headers use page links for Home, Portfolio, and Contact. Add your PDF as `assets/documents/jasmin-hingrajiya-resume.pdf`, then run `python3 scripts/build.py` to enable the header’s native download link on all pages. Until that file exists, the Resume button is disabled.

Project enquiry links open the Contact page at its form. Footer name links return Home; Back to top stays on the current page. Resume controls throughout the site use the same PDF when supplied.

The banner types and erases four design roles, holding each completed role for 2.2 seconds. A measured text area prevents layout shifts, with a pause/resume control. Typing pauses off screen and in hidden tabs; reduced-motion preferences and no-JavaScript viewing keep a complete static role.
