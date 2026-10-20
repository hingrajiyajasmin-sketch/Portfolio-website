# Mobile game portfolio

The owner's `game ui.zip` contains four original PNG montages with twelve game-interface screens. These four projects appear in **Games**, as confirmed by the owner. The thirteen existing Mobile App projects remain in their original category.

| Project | Supplied file | Screens | Design concept |
|---|---|---:|---|
| Bunny Trails | `Bunny Trails.png` | 3 portrait | A character-led lobby, pet-care view, and referral hub in a consistent woodland world. |
| Housie | `Housie Game.png` | 3 landscape | Social room discovery, a wide number board with host interaction, and a distinct results screen. |
| INU Poker | `INU Poker.png` | 3 portrait | A card-game lobby, readable multiplayer table, and grouped player statistics. |
| Jungle Treasures | `Jungle Nova.png` | 3 portrait | An adventure lobby, gameplay HUD, and a longer offers view in a shared jungle setting. |

Jungle Treasures follows the visible title inside the supplied `Jungle Nova.png`. Descriptions document the concepts and design choices visible in the source images. They do not invent product launches, user research, conversion results, or implemented earning features. No unverified live-game URLs are attached.

## Artwork and presentation

All four source PNGs are retained byte for byte in `assets/images/projects/games/`. Their filenames, dimensions, hashes, and native screen rectangles are recorded in the project catalog. Lossless 1200 × 800 PNG covers use front-facing graphite device frames, a project-specific concept line, and a palette drawn from each game's visual world.

Portrait games reuse the established mobile-device renderer. Housie uses horizontal phone frames with its original 812 × 375 screen proportions. Its main play view is shown above the lobby and results views in the cover; all three remain individually accessible in the detail view. Jungle Treasures' long offers screen scrolls inside the phone. The initial import used the supplied screens without redrawing, perspective warping, filters, or stretching; the later Housie lobby enhancement is described below.

The shared preview renderer and game-specific stylesheet preserve the existing app presentations. Detail-device widths retain native resolution on 2× displays. Larger inspection is available through **View original game screens**. Source photography and UI can only be as sharp as the supplied export.

## Refreshing the four covers

```sh
cd /workspace/Portfolio-website
python3 scripts/mobile_artwork.py --category Games
python3 scripts/build.py
```

The image-refresh helper uses the prepared environment's Playwright and Chromium. Normal website development and the content generator do not require a browser. To update one cover, use `--project housie-game` or another game ID. Keep the original PNG unchanged; update the crop metadata deliberately if a new owner-supplied export replaces it.

## QA coverage

Check all four covers for screen visibility, device boundaries, landscape proportions, and readable title placement. Compare the source hashes and native rendered interior pixels. Exercise all twelve screens on desktop and mobile, horizontal swiping, the long offers view, keyboard focus and closure, original-source links, and hiding irrelevant desktop motion controls. Check the 13 Mobile App projects, 11 website projects, All pagination, and no-JavaScript artwork access as regressions.

Verified on 2026-10-20: all four originals match the uploaded files byte for byte. Thirteen native-resolution interior samples (including both ends of the long offers screen) matched the source pixels exactly. Browser checks passed at 320, 390, 768, and 1440 CSS pixels with 2× pixel density: 48 game-screen checks, landscape proportions, swipe and keyboard scrolling, original links, focus restoration, pagination, and existing app/website previews. Default and reduced motion, no-JavaScript access, and visual review of all covers and the landscape detail layout passed with no JavaScript or HTTP errors.

## Housie lobby enhancement — 2026-10-21

At the owner's request, the room-selection screen now uses an AI-assisted clarity and color enhancement, coordinated with the brighter blue, pink, and violet gameplay/results palette. It retains the three-room layout, titles, player counts, times, and Join actions. The enhancement is a separate 1844 × 853 PNG; the supplied original montage and the other two screen crops remain untouched. This is a visual reconstruction rather than a pixel-identical source export. Its source path, dimensions, provenance, and SHA-256 are recorded in the first screen's `enhancedSource` metadata.

Both the cover exporter and interactive preview use that optional source only for the lobby. Original landscape device geometry and the conservative 2× display-width cap remain unchanged. The original montage is still accessible from the project detail. Existing app and game screens without an enhancement retain the original crop renderer.

Enhancement QA passed at 320, 390, 768, and 1440 CSS pixels with 2× density: all 48 game-screen checks, original links, landscape geometry, carousel navigation, focus restoration, and existing app/website previews passed without JavaScript or HTTP errors. All four original montages retain their recorded hashes; twelve native-resolution samples from the eleven unchanged game screens match their supplied pixels exactly. The updated cover and both mobile/desktop lobby previews were visually reviewed.
