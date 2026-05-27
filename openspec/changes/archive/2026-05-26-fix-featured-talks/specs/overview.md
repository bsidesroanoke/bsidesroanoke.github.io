## ADDED Requirements

This change is a bug fix with no new capabilities or spec-level requirement changes. The three fixes address:

1. Date formatting timezone bug — the event date string `"2026-06-05"` was parsed as UTC midnight, causing it to display as June 4 on servers in EDT (GMT-4).
2. Abstract rendering — talk abstracts live in markdown body content, not frontmatter `abstract:` fields. The component must read from `talk.body`.
3. Title layout overflow — talk titles lack width constraints, causing flex row items (time/room) to be pushed off-screen on long titles.

No new requirements are introduced. All fixes correct existing behavior to match the intended design.
