## Why

The Featured Talks section on the homepage has four bugs: the event date displays incorrectly due to timezone parsing, abstracts don't render because they live in markdown body content rather than frontmatter, talk titles lack width constraints causing layout overflow, and the heading uses a hardcoded "from" preposition regardless of whether the event is in the past or future. These issues affect the user-facing homepage before the June 5, 2026 event.

## What Changes

- Fix date formatting in `FeaturedTalks.astro` to display "June 5th, 2026" instead of "June 4th" by handling UTC-to-local timezone conversion
- Render talk abstracts from markdown body content (`talk.body`) using `marked.parse()` for HTML rendering, with fallback to frontmatter `abstract` text or placeholder. Outer wrapper changed from `<p>` to `<div>` to avoid invalid nested `<p>` tags. Abstract label separated by a line break.
- Add width constraints (`min-w-0 max-w-lg break-words`) to talk title elements — wider cap with text wrapping instead of truncation
- Use dynamic "for" vs "from" preposition based on comparing today's date against the event date (date-only comparison, timezone-independent)

## Capabilities

### New Capabilities
<!-- None — this is a bug fix, not a new capability -->

### Modified Capabilities
- **featured-talks-display**: Requirements for the FeaturedTalks component's date display, abstract rendering, and title layout are being corrected. The existing `FeaturedTalks.astro` component behavior changes but no new spec-level capabilities are introduced.

## Impact

- `src/components/FeaturedTalks.astro` — all four fixes
- No changes to content files (talk markdown bodies already contain the abstract text)
- No new dependencies or API changes
