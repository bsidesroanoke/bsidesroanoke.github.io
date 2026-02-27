## ADDED Requirements

### Requirement: Footer displays current year
The system SHALL display the current year in the footer copyright notice.

#### Scenario: Footer shows build-time year
- **WHEN** the site is built
- **AND** a user views any page on the website
- **THEN** the year displayed SHALL be the current calendar year at build time
- **AND** it SHALL NOT be hardcoded to a specific year

### Requirement: Footer year is computed at build time
The footer SHALL use AstroJS to compute the year at build time rather than being hardcoded.

#### Scenario: Year is computed during Astro build
- **WHEN** Astro builds the site
- **THEN** the year SHALL be obtained from `new Date().getFullYear()` in the component frontmatter
- **AND** the rendered HTML SHALL contain the correct year for the build date
