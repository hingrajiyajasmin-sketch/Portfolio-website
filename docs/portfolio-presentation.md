# Website-design portfolio collection

## Source material

The owner supplied `tinified (1).zip` containing eleven complete website-design exports. Names and project descriptions were derived from the visible screen content. The website retains the owner’s confirmed 7+ years of experience; it does not claim 10+ years or invent project results, client relationships, implementation responsibilities, or live project URLs.

| Project | Supplied file | Category |
|---|---|---|
| DevsTree | `Devstree.com.jpg` | Website Design |
| EasyProps | `EasyProps.jpg` | Website Design |
| Mint & Oak | `Frame 2085670661.jpg` | Website Design |
| Muss Montessori | `Muss Montessori New Website.jpg` | Website Design |
| HYYPP | `Landing page  2.jpg` | Website Design |
| Mississauga Convention Centre | `Events website.jpg` | Website Design |
| Dawdle | `Home page.jpg` | Website Design |
| SUTRAAai | `Home-1.jpg` | Website Design |
| Pride of Africa | `Pride Of Africa.jpg` | Website Design |
| Cuu Long Fish | `Frame 2.jpg` | Website Design |
| FairPlay Giveaways | `Home.jpg` | Website Design |

## Artwork

`assets/images/projects/desktop-monitor.webp` is a shared, lossless WebP studio photograph generated for this presentation. The front-facing desktop display uses the same geometry, lighting, and scale across all eleven projects. Each `<id>-original.jpg` is a byte-for-byte copy of its supplied JPEG. The browser displays that actual design inside the screen; website text is never generated or perspective-warped. The full-page link opens that same source image. Sharpness remains limited by the resolution and compression of the supplied originals.

The website collection replaces the earlier demo catalog. The home page features DevsTree, Mint & Oak, and EasyProps. Thirteen additional app projects appear in the Mobile App tab; see [Mobile app presentation](mobile-app-presentation.md). Games and logo tabs remain empty until matching work is supplied.

## Content and layout

The aligned two-column gallery remains intact. Project content describes the visible design challenge, visual direction, scope, and focus rather than unverified research or results. A consistent desktop monitor and neutral studio setting keep attention on the work. The shared monitor asset is downloaded once and reused. Both the monitor and the original screen images are lazy-loaded. Category chips sit on the desk area, clear of the website screen.

The supplied exports are the authoritative visual project references. The live websites below were checked separately; published websites can change independently of the archived designs. A matching company website does not establish a commissioned relationship or implementation credit.

## Live project links

Checked on 2026-10-19 using HTTPS requests with certificate verification. Each confirmed homepage returned HTTP 200. These URLs are stored in the project catalog and appear as **Visit live website** in project previews, opening in a new tab.

| Project | Confirmed website | Matching evidence |
|---|---|---|
| DevsTree | https://www.devstree.com/ | The original export is named `Devstree.com.jpg`; the live site matches the DevsTree identity, phone number, and Ganesh Glory address in the supplied design. |
| EasyProps | https://www.easyprops.com/ | The supplied design includes `easyprops.com`; the live homepage identifies EasyProps as an Ahmedabad property platform. |
| Mississauga Convention Centre | https://mississaugaconvention.com/ | The supplied design lists this contact-email domain; the live venue site matches the company identity and 75 Derry Road West address. |

Mint & Oak, Muss Montessori, HYYPP, Dawdle, SUTRAAai, Pride of Africa, Cuu Long Fish, and FairPlay Giveaways remain unconfirmed. Searches did not establish a reliable matching live website, so their previews omit the live-site link. This does not establish that those projects are offline. Placeholder domains in the artwork are excluded.

## Maintenance

Edit `assets/data/portfolio-projects.json`, then run `python3 scripts/build.py`. Category must be one of the existing tab categories. Update home featured-card markup separately when changing featured projects. The standalone exporter embeds both covers and original-design links.

## Scrolling device previews

The original JPEG sits in a clipped, front-facing screen window in both server-rendered cards and project dialogs. The screen rectangle is left 188, top 86, right 1350, bottom 710 in a 1536 × 1024 reference frame. CSS percentages preserve alignment as the monitor resizes. The image keeps its natural aspect ratio; it is not stretched, rasterized through a canvas, or re-encoded. Without JavaScript or with reduced motion, the actual original page remains visible at the top.

Only the webpage moves. All previews travel at one visible screenful every four seconds, with 1.2-second acceleration/deceleration ramps and 2.5-second holds at either end. Different page lengths therefore have different cycle durations but the same perceived speed. ResizeObserver measures fractional rendered dimensions to avoid gaps at the bottom of a page. Web Animations moves the image using a transform.

Global and dialog controls pause/resume motion, with the preference retained for the browser session. Hover/focus, offscreen previews, background tabs, and underlying cards while a project dialog is open pause the relevant animation. Reduced-motion changes cancel animations and show static original designs.

When replacing the monitor photograph, update the shared screen CSS rectangle and the catalog's deviceScreen metadata together. Keep each original paired with its correct project.
