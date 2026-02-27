## Context

The BSides Roanoke website has three independent updates needed:
1. Sponsor contact email needs to be updated to a new inbox
2. A blog post needs to be created announcing ticket availability
3. The footer has a hardcoded year that needs to be dynamic

The current sponsor contact email `info@bsidesroanoke.org` appears in EventsUi.astro. The new email `sponsors@roanokeinfosec.com` is specific to sponsor communications.

The 2026 event in `src/content/events/2026.md` currently has the register field commented out and needs to point to the Zeffy ticketing portal.

The Footer.astro component uses a hardcoded `2026` year.

## Goals / Non-Goals

**Goals:**
- Update sponsor contact email to sponsors@roanokeinfosec.com
- Create blog post announcing ticket availability with link to Zeffy
- Update 2026 event register field with Zeffy URL
- Make footer year dynamic at build time using AstroJS

**Non-Goals:**
- Update any other email addresses on the site (only the sponsor contact)
- Create any new pages or components beyond the blog post
- Modify any other years in the codebase

## Decisions

1. **Footer year approach**: Use AstroJS build-time year calculation with `new Date().getFullYear()` directly in the component's frontmatter. Since this is a static site, the year will be set at build time and remain correct until the next build.

2. **Blog post format**: Follow the existing blog post format using the date-prefixed naming convention (e.g., `2026-02-post-01-tickets-available.md`) to maintain chronological ordering.

3. **Email replacement scope**: Only replace the specific instance in the sponsorship section of EventsUi.astro, not a global find/replace.

## Risks / Trade-offs

- **Risk**: The Zeffy URL could change in the future. → Mitigation: The URL is only needed for the next ~4 months until the event passes. The risk of it changing in that timeframe is minimal.

- **Risk**: Footer year needs rebuild to update. → Mitigation: The site is rebuilt periodically; the year will be correct at build time. This is standard for static sites.
