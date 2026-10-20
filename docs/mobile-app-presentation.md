# Mobile app portfolio

The owner's `mobile app.zip` contains 13 original PNG exports with 40 individual interface screens. Every original is copied byte for byte into `assets/images/projects/mobile/`. The project catalog records each original filename, native size, SHA-256, and screen rectangle. The supplied images are design references, not evidence of a launched app, commissioned relationship, user research, conversion improvement, or verified product security.

## Project concepts

| Project | Supplied PNG | Screens | Presentation focus |
|---|---|---:|---|
| Box Booking | `BoxBookiing.png` | 3 | Sports-venue discovery, booking, confirmation |
| Bucket | `Bucket List App.png` | 3 | Saved places, collections, local discovery |
| Famlee | `famlee.png` | 2 | Dated memories and photo-led social posts |
| hello.date | `Hello.Date.png` | 3 | Profile discovery and account preferences |
| HomeWorth | `Home Worth.png` | 2 | Property cases in a tablet workspace |
| Hyppe | `Hyppe.png` | 3 | Creator campaigns and model bookings |
| Klerdy | `Klerdy.png` | 3 | Prediction-market UI and leaderboards |
| Klub | `Klub.png` | 4 | Nightlife discovery and group invitations |
| MitGo | `MitGo.png` | 3 | Passenger search and driver workflows |
| PWR | `Powerbak.png` | 4 | Recruitment stages and training progress |
| Salam Chat | `Salam Chat.png` | 4 | Community, marketplace, wallet, profile |
| Trustvault | `trustvault.png` | 3 | Wallet choices, token overview, settings |
| Yomo | `Yomo.png` | 3 | Telecom balances and bundle management |

Names and descriptions follow the visible screens and supplied filenames. PWR follows the name inside `Powerbak.png`; HomeWorth remains a tablet workspace. Concept and design-focus copy describes the visible journey without inventing market-validation results. None of the app projects has an unverified live-app URL.

## Artwork and source fidelity

Each project has a lossless **1200 × 800 PNG cover** with its own restrained background, concept line, and focus areas. The actual supplied interfaces appear in front-facing graphite hardware frames rendered with CSS. No perspective warp, additional camera cutout, filter, generated UI, or stretched screen changes the original design. Smaller cover devices downsample the original screen pixels; export fails if a screen would be enlarged or clipped by the artwork boundary.

The cover and live detail view share `assets/js/mobile-projects.js` and `assets/css/mobile-projects.css`. Source rectangles are revealed through proportional image positioning inside cropped windows. The original montage is not destructively cut or re-encoded. All 40 screens are available in the detail view, including screens not selected for the three-device covers. Long source views scroll inside the hardware; shorter views are not stretched to fill it. Tablet screens use tablet frames.

Detail-device widths are capped to retain source resolution on 2× displays. Source photography can only be as sharp as the supplied pixels; the full-resolution original is available separately. Native pixel QA compares interior source and rendered pixels while excluding the hardware's rounded corner mask.

## Refreshing artwork

Ordinary site development needs only the existing Python static server. `python3 scripts/build.py` refreshes the catalog and preserves the mobile presentation metadata. It does not regenerate images.

When screen coordinates, cover copy, or hardware styling change, use the prepared environment's Chromium and Playwright:

```sh
cd /workspace/Portfolio-website
python3 scripts/mobile_artwork.py
# Or refresh a single project:
python3 scripts/mobile_artwork.py --project box-booking
python3 scripts/build.py
```

Do not overwrite a supplied original. Replace it deliberately with an owner-supplied higher-resolution export, then update the dimensions, screen rectangles, and source hash together.

## QA

The initial artwork review checked all 13 covers, all 40 screen rectangles, source-file hashes, and **63 native-resolution top/bottom samples**. The sampled interior pixels matched the original PNGs exactly. Visual QA covered phone and tablet frames, long settings/feed views, device boundaries, and the two-screen and four-screen projects.

Functional QA passed at 320, 390, 768, and 1440 CSS pixels with a 2× device scale: 160 app-screen checks and 92 long-screen scroll checks. All 13 app projects, the 11 existing website previews, category filtering, pagination, keyboard focus, original-source links, and default/reduced-motion controls passed. No JavaScript or HTTP asset errors were observed. At that review, no-JavaScript viewing retained all 24 project covers, and repeated content generation was stable. The collection now also includes four projects in Games; see [Game presentation](game-presentation.md).

Before publishing further changes, check Mobile App's 13 cards, All's pagination, Website Design's 11 existing projects, all app detail screens and scrolling, desktop/mobile layouts, keyboard closure and focus, original-source links, and the three previously verified website links. App detail views must not expose the desktop preview-motion control. Preserve no-JavaScript access to the artwork and reduced-motion support.
