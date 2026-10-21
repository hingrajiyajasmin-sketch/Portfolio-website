# Portfolio sequence

The October 21, 2026 review considered the supplied artwork and each recorded project flow from a prospective client's perspective: immediate visual clarity, cohesive UI, understandable product tasks, and range across business needs. Existing project descriptions, source artwork, and verified website links remain unchanged.

## Home introduction

The owner selected **Muss Montessori → MitGo → Jungle Treasures**. This introduces a parent-facing website, a passenger/driver application, and an expressive mobile game. Category labels make the three services immediately clear. Original monitor screens and complete device-framed app/game covers are used with working detail previews.

## Category sequences

| Tab | Display order | Opening emphasis |
|---|---|---|
| Website Design | Muss Montessori → HYYPP → Mint & Oak → EasyProps → Mississauga Convention Centre → Dawdle → DevsTree → SUTRAAai → Pride of Africa → FairPlay Giveaways → Cuu Long Fish | Approachable education design, a distinctive digital brand, and commercial storefront design; then search, hospitality, travel, and corporate breadth. |
| Mobile App | MitGo → Box Booking → Bucket → HomeWorth → Trustvault → PWR → Salam Chat → Hyppe → Klub → Yomo → Klerdy → hello.date → Famlee | Recognisable ride and booking journeys, a bright discovery app, then operational tablet UI and financial/account interfaces. |
| Games | Jungle Treasures → Bunny Trails → Housie → INU Poker | Immersive adventure artwork, character-led casual play, then landscape social play and multiplayer cards. |
| Logo Design | Empty | Await supplied logo work. |

**All** interleaves categories rather than presenting eleven websites before any app. Its first twelve are Muss Montessori, MitGo, Jungle Treasures, HYYPP, Box Booking, Bunny Trails, Mint & Oak, Bucket, HomeWorth, EasyProps, Housie, and Trustvault. This makes web, app, and game work discoverable before Load more, while preserving each category's chosen order. All 28 projects remain available.

## Maintenance

`assets/data/portfolio-projects.json` is the ordered source for the collection. Filtering preserves that order, and no client-side reordering changes keyboard navigation. `assets/data/featured-projects.json` independently controls the three home cards. Run `python3 scripts/build.py` after either edit. Tab count badges are omitted from the generator, so they stay removed after rebuilding.

## Verification

Browser checks passed at 320, 390, 768, and 1440 CSS pixels with 2× density. These covered all three home covers and both detail-entry buttons, original links, app/game screen galleries and long-screen scrolling, every category sequence, All pagination/reset, keyboard closure and focus restoration, and no horizontal overflow. Cover images stay within their 1200-pixel native width at 2× density. Runtime animation checks measured two seconds per screenful, a 0.75-second initial hold, correct full-page bottom alignment, and reduced-motion cancellation on both Home and Portfolio. No JavaScript or HTTP asset errors were observed. No-JavaScript artwork, repeatable builds, and the complete set of 28 unchanged project records were verified.
