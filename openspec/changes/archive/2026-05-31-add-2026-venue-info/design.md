## Context

BSides Roanoke 2026 will be held at Virginia Western Community College on June 5, 2026. Since the event falls during active class hours, standard campus parking may be restricted. Attendees need clear guidance on where to park, how to find key venue locations, and access to directions resources.

The venue consists of multiple buildings:
- Hall Family Center for Business Science (contains Whitman Theater/Auditorium)
- Fralin Center (contains DefSec Room)
- Registration outside Whitman Theater
- Vendor and cafe area across from the auditorium
- CTF room at M302 in Business Science Building

## Goals / Non-Goals

**Goals:**
- Provide clear parking instructions directing attendees to student parking lots
- Include handy links for directions and campus maps
- Document all key venue locations with building references
- Help attendees navigate from parking to event areas

**Non-Goals:**
- Changing event date, time, or ticketing information
- Adding new capabilities beyond content display
- Modifying site architecture or theming

## Decisions

1. **Update `venue_parking` frontmatter field**
   - Rationale: Standard location for parking/transportation info in event content
   - Alternative: Could use a separate page, but keeping it in frontmatter maintains consistency with existing event format

2. **Add venue navigation content to main event page body**
   - Rationale: The main page is where attendees first look for event details
   - Key locations need prominent placement so attendees can find them easily

3. **Include directional links (VWCC directions, campus map PDF)**
   - Rationale: External resources provide most up-to-date campus information
   - Links are more maintainable than embedding map details

## Risks / Trade-offs

- **Campus changes during event year** → Mitigation: Links point to VWCC official resources which are kept current
- **Building locations shift** → Mitigation: Content includes note that everything will be marked from the auditorium