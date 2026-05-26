## 1. Fix date formatting in FeaturedTalks.astro

- [x] 1.1 In `formatDate()` function (line 78), append `'T00:00:00'` to the date string before passing to `new Date()` so it parses as local midnight instead of UTC midnight
  - Change: `new Date(dateString)` → `new Date(dateString + 'T00:00:00')`

## 2. Fix abstract rendering in FeaturedTalks.astro

- [x] 2.1 Import `marked` from the 'marked' package (already a project dependency)
- [x] 2.2 Replace `{talk.data.abstract}` with conditional: use `marked.parse(talk.body).trim()` via `set:html` for markdown body, fall back to `talk.data.abstract` text or `'No abstract available.'`
- [x] 2.3 Change outer `<p>` wrapper to `<div>` to avoid invalid nested `<p>` tags from marked output
- [x] 2.4 Add `<br/>` after "Abstract:" label so abstract text starts on a new line

## 3. Fix title width constraint in FeaturedTalks.astro

- [x] 3.1 On the `<h3>` element, change `max-w-md truncate` to `max-w-lg break-words` — wider cap (~512px) and allow text wrapping instead of truncating with ellipsis

## 4. Dynamic preposition: "for" vs "from" based on event date

- [x] 4.1 Add `isEventDayOrBefore(dateString)` helper function that compares year/month/day components (ignoring time) to determine if today is on or before the event date
- [x] 4.2 In the template (line ~98), use `{isEventDayOrBefore(currentEvent.date) ? 'for' : 'from'}` in the `<h2>` heading instead of hardcoded "from"

## 5. Verify fixes

- [x] 5.1 Run dev server and verify homepage shows "June 5th, 2026" in the Featured Talks title
- [x] 5.2 Verify preposition reads "for" (not "from") since June 5 is in the future
- [x] 5.3 Verify all 3 featured talk abstracts are visible (Trailblazing, Living With InfoSec Anemoia, RelayKing)
- [x] 5.4 Verify markdown in abstracts renders as HTML (italics `<em>`, bold `<strong>`, paragraphs `<p>`)
- [x] 5.5 Verify "Abstract:" label has a line break before the text content
- [x] 5.6 Verify talk titles use `max-w-lg break-words` — no ellipsis, text wraps naturally
