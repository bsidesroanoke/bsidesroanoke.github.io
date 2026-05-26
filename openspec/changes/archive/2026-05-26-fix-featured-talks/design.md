## Context

The `FeaturedTalks` component (`src/components/FeaturedTalks.astro`) renders 3 featured talks for BSides Roanoke 2026 on the homepage. It is called from `EventsUi.astro:116` with the event prop passed down. The component uses Astro content collections to fetch talks and formats them with Tailwind CSS classes.

Current state of the three featured talks (all have `eventSlug: "2026"` and `featured: true`):
- `trailblazing.md` — title has abstract in body, no `abstract:` frontmatter field
- `living-with-infosec-anemoia.md` — title has abstract in body, no `abstract:` frontmatter field  
- `relay-king.md` — title has abstract in body, no `abstract:` frontmatter field

The event date is stored as `"2026-06-05"` (date-only string) in `src/content/events/2026.md`.

## Goals / Non-Goals

**Goals:**
- Display the correct event date ("June 5th, 2026") regardless of server timezone
- Render talk abstracts from markdown body content
- Constrain talk title width to prevent flex layout overflow
- Use "for" before the event and "from" after the event in the heading preposition
- Reorder talk card layout: title leftmost, time/room rightmost, speaker name between them

**Non-Goals:**
- Adding `abstract:` frontmatter fields to all talk files (body is the source of truth)
- Restructuring the FeaturedTalks component or its props interface
- Changes to any other components or pages

## Decisions

### 1. Date formatting: append time string instead of using timezone-aware parsing

**Decision**: Change `formatDate()` from:
```js
new Date(dateString).toLocaleDateString('en-US', options)
```
to:
```js
new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options)
```

**Rationale**: The event date `"2026-06-05"` has no time component. Per the ECMAScript spec, a date-only string is parsed as UTC midnight (`2026-06-05T00:00:00Z`). On servers in EDT (GMT-4), this becomes June 4 at 8 PM local time. Appending `T00:00:00` forces the parser to treat it as a **local** midnight, which displays correctly regardless of server timezone.

**Alternatives considered**:
- Use `Intl.DateTimeFormat` with explicit `timeZone: 'America/New_York'` — more precise but adds complexity and assumes Eastern time for all deployments
- Store dates with time in frontmatter (e.g., `"2026-06-05T00:00:00"`) — would require editing content files, which we're avoiding

### 2. Abstract rendering: use `marked.parse()` for HTML output

**Decision**: Import `marked` (already a project dependency via `ImprovedSchedule.tsx`) and render markdown body as HTML:

```html
{talk.body ? (
  <span set:html={marked.parse(talk.body).trim()} />
) : talk.data.abstract ? (
  talk.data.abstract
) : (
  'No abstract available.'
)}
```

Also changed the outer `<p>` wrapper to `<div>` to avoid invalid nested `<p>` tags from `marked.parse()` output. Added `<br/>` after "Abstract:" label for proper line separation.

**Rationale**: The original design considered plain text rendering with `whitespace-pre-line`, but abstracts contain markdown formatting (italics, bold, paragraphs) that should be rendered as HTML. Using `marked` — already in the project — provides consistent markdown-to-HTML conversion. The `<div>` wrapper avoids invalid nested `<p>` tags since `marked.parse()` produces `<p>` elements.

**Alternatives considered**:
- Add `abstract:` frontmatter to all talk files — adds maintenance burden (two places for the same content) and requires editing 3+ files
- Use Astro's `render()` function on each entry — overkill; `marked` is simpler and already available in this project

### 3. Title width constraint: widen and allow wrapping instead of truncating

**Decision**: On the `<h3>` title element, use `min-w-0 max-w-lg break-words` (changed from original `max-w-md truncate`).

**Rationale**: 
- `min-w-0` — in a flex container, items won't shrink below their content size by default. This is required for width constraints to work.
- `max-w-lg` (~512px) — wider than the originally planned `max-w-md` (~448px), giving long titles more room before wrapping
- `break-words` — allows text to wrap naturally at word boundaries instead of truncating with ellipsis, which was undesirable for talk titles

**Alternatives considered**:
- `truncate` (ellipsis) — hides part of the title; unacceptable for a conference where attendees need to identify talks
- `max-w-md truncate` — too narrow and still truncates; widened to `lg` and switched to wrapping after review

### 4. Layout reordering and speaker names

**Decision**: Reorder the talk card layout so title is leftmost, time/room rightmost on the same row. Add a "by {speaker name}" line between the title row and abstract.

```html
<div class="flex flex-col sm:flex-row sm:items-start justify-between mb-1 gap-2 sm:gap-0">
  <h3>title</h3>
  <div class="shrink-0">
    <span>{time}</span>
    <span>{room}</span>
  </div>
</div>
<p>by {speaker names joined by ', '}</p>
```

Speaker resolution: fetch `speakers` collection in frontmatter, build a slug→name Map (same pattern as `Schedule.astro:15-24`), resolve via helper function.

**Rationale**: 
- Title leftmost follows reading order and gives it visual priority
- Time/room right-aligned keeps metadata grouped but secondary to the title
- Speaker name on its own line between title and abstract provides attribution context
- `shrink-0` on time/room container prevents it from being compressed when title is long

**Alternatives considered**:
- Keep original layout (time/room left, title right) — less natural reading order for a talk card where the title should be primary
- Put speaker name inline with title — loses attribution prominence; "by {name}" on its own line reads better

### 5. Dynamic preposition: compare date components, not datetimes

**Decision**: Add a helper function that compares year/month/day only (ignoring time):

```js
function isEventDayOrBefore(dateString) {
  const event = new Date(dateString);
  const now = new Date();
  return (now.getFullYear() < event.getFullYear()) ||
    (now.getFullYear() === event.getFullYear() &&
     now.getMonth() < event.getMonth()) ||
    (now.getFullYear() === event.getFullYear() &&
     now.getMonth() === event.getMonth() &&
     now.getDate() <= event.getDate());
}
```

Then in the template: `{isEventDayOrBefore(currentEvent.date) ? 'for' : 'from'}`

**Rationale**: The event date `"2026-06-05"` has no time component, so `new Date()` parses it as UTC midnight. Comparing full datetimes would give wrong results depending on the server's timezone (e.g., a UTC server on June 4 evening would see "June 5 UTC" as already passed). By comparing only year/month/day components, the result is timezone-independent and matches calendar-day semantics.

**Alternatives considered**:
- `new Date(dateString) <= new Date()` — fails due to UTC midnight parsing issue described above
- String comparison (`dateString <= todayStr`) — fragile, depends on YYYY-MM-DD format consistency
- Use `Intl.DateTimeFormat` with explicit timezone — overkill for a simple date comparison

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Server timezone differs from local dev during testing | The fix uses local-time parsing, so it works correctly regardless of server TZ. Test by checking the rendered HTML output. |
| Long talk titles wrap across multiple lines instead of truncating | `max-w-lg` is wide enough for most titles; wrapping provides full visibility rather than hiding content with ellipsis. All current 2026 titles fit within the constraint. |
| `marked.parse()` produces `<p>` tags that could nest inside outer `<p>` | Changed outer wrapper from `<p>` to `<div>`, avoiding invalid nested paragraph elements. |
| `talk.body` could be undefined for non-Markdown entries | The fallback chain (`talk.body ? marked.parse(talk.body) : talk.data.abstract : 'No abstract available.'`) handles all cases safely. |
| Preposition is baked into static HTML at build time | This is expected behavior for Astro prerendered sites. The preposition reflects the state at build time — correct after each deploy. |
| Speaker slug doesn't match any speaker record | `getSpeakerNames()` falls back to the raw slug if no match found, so it won't break silently |
