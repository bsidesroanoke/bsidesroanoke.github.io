# BSides Roanoke Website

## 🚀 What is this thing?

Welcome to the digital fortress of BSides Roanoke - where cybersecurity meets cyberpunk in a glorious collision of bits and bytes! This repo is the official website for [bsidesroa.org](https://bsidesroa.org), your portal to the annual infosec extravaganza that makes hackers blush and firewalls weep.

Built with Astro and Tailwind CSS, this site is your command center for:
- **Hacking the mainframe** of conference info with markdown-powered content
- **Deploying social engineering** through speaker profiles and talk descriptions
- **Cracking the code** of event schedules and blog posts
- **Bypassing boring designs** with glitch animations and dark theme vibes

Think of it as a digital speakeasy for the infosec crowd - where the drinks are cold, the talks are hot, and the vulnerabilities are... well, we're working on patching those.

## 📝 How might I add things to collections in markdown?

Adding content is easier than cracking a weak password! Just create markdown files in the right folders:

### Adding Events
Create a new `.md` file in `src/content/events/`:
```markdown
---
title: "BSides Roanoke 2025"
date: 2025-04-15
location: "Roanoke, VA"
description: "Annual information security conference"
---

# BSides Roanoke 2025

Join us for another year of hacking, learning, and questionable life choices in the name of cybersecurity!
```

### Adding Talks
Drop a `.md` file in `src/content/talks/`:
```markdown
---
title: "The Future of AI in Threat Detection"
speakers: 
  - "john-doe"
  - "jane-smith"
startTime: "2024-10-26T09:00:00"
endTime: "2024-10-26T09:50:00"
room: "Main Hall"
abstract: "Exploring AI applications in modern threat detection"
eventSlug: "2024"
featured: false
---

# The Future of AI in Threat Detection

An exciting dive into how artificial intelligence is revolutionizing the way we detect and respond to cyber threats.
```

### Adding Speakers
Add speaker profiles in `src/content/speakers/`:
```markdown
---
name: "John Doe"
title: "Senior Security Engineer"
twitter: "@johndoe"
bio: "Seasoned security professional with 15+ years experience in ethical hacking and threat detection"
featured: 
  - "2024"
  - "2025"
photo: "../../../images/john-doe.jpg"
photoAlt: "John Doe, Senior Security Engineer"
---
John is a wizard with firewalls and a guru of secure coding practices. When not hacking the planet, he enjoys long walks on the beach and pentesting cloud infrastructure.
```

### Adding Blog Posts
Write blog content in `src/content/blogs/`:
```markdown
---
title: "Understanding Modern Web Security"
author: "Security Team"
date: 2023-10-01
excerpt: "An overview of current web security practices"
tags: ["security", "web", "best-practices"]
---
In today's digital landscape, web security is more critical than ever. Let's explore the latest threats and defenses...
```

## 📚 Content Collection Reference

### Events (`src/content/events/`)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Name of the event |
| `date` | string | Yes | Date of the event (YYYY-MM-DD) |
| `location` | string | Yes | Physical location |
| `featured` | boolean | No | Whether to feature this event |
| `venue_parking` | string | No | Parking information |
| `register` | string | No | Registration link |
| `description` | string | No | Short description |
| `heroImage` | image | No | Banner image |
| `heroImageAlt` | string | No | Alt text for banner |

### Talks (`src/content/talks/`)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Title of the talk |
| `speakers` | array<string> | No | List of speaker IDs (filenames without .md) |
| `startTime` | datetime | No | ISO 8601 start time (YYYY-MM-DDTHH:mm:ss) |
| `endTime` | datetime | No | ISO 8601 end time (YYYY-MM-DDTHH:mm:ss) |
| `room` | string | Yes | Room name |
| `eventSlug` | string | No | Slug of the associated event |
| `featured` | boolean | No | Whether to feature this talk |
| `abstract` | string | No | Short summary |

### Speakers (`src/content/speakers/`)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Full name |
| `title` | string | No | Job title |
| `company` | string | No | Company name |
| `socialLinks` | array<string> | No | List of social media URLs |
| `featured` | array<string> | No | List of event slugs this speaker is featured in |
| `photo` | image | No | Path to speaker photo (relative to file) |
| `photoAlt` | string | No | Alt text for photo |

### Sponsors (`src/content/sponsors/`)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Sponsor name |
| `logo` | string | No | Path to logo image |
| `website` | url | No | Link to sponsor website |
| `years` | array<string> | Yes | List of event slugs sponsored |
| `rank` | number | No | Sorting order (lower is higher priority) |

### Blogs (`src/content/blogs/`)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Blog post title |
| `description` | string | No | Short description/excerpt |
| `pubDate` | string | Yes | Publication date |
| `cover` | image | No | Cover image |
| `coverAlt` | string | No | Alt text for cover |
| `author` | string | No | Author name |
| `tags` | array<string> | No | List of tags |

### CFP (`src/content/cfp/`)
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Title (e.g. "Call for Papers") |
| `closeDate` | string | Yes | Closing date |
| `link` | url | Yes | Link to CFP submission form |

**Pro tip**: After adding content, run `npm run dev` to see your changes live!

## 📝 TODO

- [x] Update talks collection documentation to reflect use of `speakers` array instead of single `speaker`
- [x] Document proper time format for talks (`startTime`, `endTime` as ISO datetime)
- [x] Add complete field reference for each collection type
- [x] Clarify that talks can have multiple speakers
- [x] Update speaker documentation to include image handling with `photo`/`photoAlt`

## 🛠️ How do I test&debug locally without an AI agent?

### Getting Started (The Human Way)
1. **Install Node.js** (v16+) if you haven't already
2. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd bsides-astro
   npm install
   ```

3. **Start the dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:4321` in your browser

### Manual Debugging 101

**Problem**: Site not loading or building?
**Solutions**:
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Kill and restart the dev server: `Ctrl+C` then `npm run dev`
- Check for obvious typos in your markdown files
- Ensure all frontmatter fields are present and correct

**Problem**: Content not showing up?
**Debug steps**:
- Verify file is in the correct `src/content/` subdirectory
- Check that the `.md` extension is correct
- Ensure frontmatter has required fields (look at existing files for examples)
- Try `npm run build` to catch validation errors

**Problem**: Styling looks weird?
**Quick fixes**:
- Check browser dev tools for CSS errors
- Ensure `global.css` is imported in your layouts
- Verify Tailwind classes are spelled correctly
- Test in a different browser

**Problem**: Changes not appearing?
**Nuclear option**:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Remember: Sometimes the simplest solution is the best. Check your file paths, spelling, and that you're editing the right files. Your future self will thank you for good naming conventions!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and formatting
- Add comments for complex logic
- Update documentation for new features
- Test changes in multiple browsers
- Ensure accessibility standards are maintained

## 🔧 Astro JS MCP Server

For enhanced development experience, leverage our configured MCP server:

```bash
# Check available tools and resources
ls .roo/mcp.json
```

Our `.roo/mcp.json` file provides access to:
- **Astro documentation search**: Use `search_astro_docs` tool for quick API and CLI references

Example usage:
```bash
use_mcp_tool astro-docs search_astro_docs --query "cli commands"
```

## ✨ Useful Astro JS CLI Commands

Here are the most commonly used Astro CLI commands:

- **Add integrations**:
  ```bash
  npm run astro add @astrojs/tailwind
  ```

- **Start development server**:
  ```bash
  npm run dev
  ```
  - Opens your site at `http://localhost:4321`
  - Hot Module Replacement for instant feedback

- **Build for production**:
  ```bash
  npm run build
  ```

- **Check for errors**:
  ```bash
  npm run check
  ```

- **Preview the build locally**:
  ```bash
  npm run preview
  ```
  - Useful for testing your static site before deployment

Additional helpful commands:
- `astro info` - Show environment details
- `astro docs` - Open Astro documentation in browser
- `astro --help` - List all available commands and flags

---

*Built with ❤️ for the information security community*
