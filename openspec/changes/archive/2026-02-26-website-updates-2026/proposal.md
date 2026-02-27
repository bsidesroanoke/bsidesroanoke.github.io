## Why

The BSides Roanoke website needs three updates: (1) the sponsor contact email needs to change from info@bsidesroanoke.org to sponsors@roanokeinfosec.com to properly direct sponsor inquiries to the dedicated inbox, (2) a blog post is needed to announce ticket availability for BSides Roanoke 2026 with a link to the Zeffy ticketing portal, and (3) the Footer.astro component has a hardcoded 2026 year that should be dynamically generated.

## What Changes

- **Update sponsor contact email**: Change the email address in EventsUi.astro from `info@bsidesroanoke.org` to `sponsors@roanokeinfosec.com` in the sponsorship inquiry text
- **Create blog post**: Add a new blog post announcing ticket availability for BSides Roanoke 2026 linking to https://www.zeffy.com/en-US/ticketing/bsides-roanoke--2026
- **Update 2026 event register field**: Add the Zeffy ticketing URL to the `register` field in the 2026 event markdown file
- **Auto-generate footer year**: Replace hardcoded 2026 in Footer.astro with dynamic year calculation using JavaScript

## Capabilities

### New Capabilities
- `blog-ticket-announcement`: A new blog post announcing ticket availability for BSides Roanoke 2026

### Modified Capabilities
- `sponsor-contact`: Update the sponsor contact email in the EventsUi component
- `event-registration`: Add ticket purchase link to the 2026 event data
- `dynamic-footer-year`: Make the footer year dynamic instead of hardcoded

## Impact

- `src/components/EventsUi.astro`: Sponsor contact email text update
- `src/content/blogs/`: New blog post file for ticket announcement
- `src/content/events/2026.md`: Register field update
- `src/components/Footer.astro`: Dynamic year JavaScript
