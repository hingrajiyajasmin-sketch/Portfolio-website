# Eleven-project portfolio collection

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

Each `assets/images/projects/<id>-cover.webp` is an AI-generated device presentation based on the corresponding supplied website screenshot. The website screen is the subject; backgrounds and device photography are presentation artwork. Each `<id>-full.webp` preserves the supplied full-page layout, optimized as WebP. Previews offer a link to this full-page design so the exact original work can be examined.

The complete collection replaces the earlier demo catalog. The home page features DevsTree, Mint & Oak, and EasyProps. Other portfolio tabs remain available but show an empty state until matching mobile-app, development, or logo work is supplied.

## Content and layout

The aligned two-column gallery remains intact. Project content describes the visible design challenge, visual direction, scope, and focus rather than unverified research or results. Physical laptop and monitor scenes use a restrained studio style with project-specific palettes. Cover images are lazy-loaded and originals are opened only when requested.

Behance and external research sites were blocked from this environment. These presentation choices use established portfolio principles; no fresh market-research claim is made. The supplied exports are the authoritative project references.

## Maintenance

Edit `assets/data/portfolio-projects.json`, then run `python3 scripts/build.py`. Category must be one of the existing tab categories. Update home featured-card markup separately when changing featured projects. The standalone exporter embeds both covers and original-design links.
