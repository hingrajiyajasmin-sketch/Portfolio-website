# Portfolio presentation refresh

## Material used

- Actual desktop and mobile screenshots of this repository’s personal portfolio.
- AI-generated laptop-and-phone presentation based on those screens, deployed as `assets/images/projects/jasmin-portfolio-devices.webp`.
- Confirmed 7+ years of experience retained. No 10+ years claim, invented clients, or unverified performance metrics added.
- Behance profile: https://www.behance.net/hingrajjasmin

## Presentation decisions

Show the responsive website on realistic devices, keep the screen identity recognisable, and use the existing orange/black palette. Explain the project purpose, design decisions, scope, and implemented experience. Label the portfolio as a personal project and retain explicit concept labels for the sample catalog. Keep the aligned two-column gallery and existing project filters.

## Source limitations

Behance and external research pages returned network access denials in this environment. No claim of a completed Behance audit or fresh market research is made. The other catalog entries remain demo concepts. To replace them with actual work, supply exported Behance covers/screens and the project names, role, brief, and public project URLs.

## Adding actual projects

Add a local image path, descriptive `imageAlt`, accurate `idea` and `direction`, optional `scope` and `outcome`, and an optional `website` link in `assets/data/portfolio-projects.json`. Use `sample: false` only for verified work and `label` to identify personal, client, or independent work accurately. Set one of the existing categories. Run `python3 scripts/build.py` to refresh the rendered portfolio; the home featured card markup is edited separately.
