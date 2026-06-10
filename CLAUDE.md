---
name: feedback_coding_standards
description: "Strict project coding standards for HTML/CSS/JS separation, file structure, naming conventions, and Bootstrap-first styling"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: c554e36b-c0da-498f-ad4c-8f65e3e36ee1
---

These standards override CLAUDE.md defaults (which allow inline styles and Tailwind in a single index.html).

## HTML
- HTML files contain HTML only — no inline `style=""`, no `<style>` blocks, no inline JS, no `<script>` tags in `<head>`
- Never place HTML inside JavaScript

## CSS
- All CSS in external stylesheets only (linked via `<link>`)
- Never target HTML tags directly — always use classes
- Class naming: dash-separated (e.g., `hero-section`)
- ID naming: underscore-separated (e.g., `hero_section`)
- One blank space after every class declaration in CSS
- Keyframe names: lowercase, dash-separated
- No redundant or unnecessary styles
- Bootstrap predefined classes preferred — custom CSS only when Bootstrap can't cover it
- Media queries: use greater-than/less-than logic (not `min-width`/`max-width`)
- Colors: HEX values only, not RGB

## JavaScript
- All JS in external files only
- Define all functions at the top of the file before use
- No redundant logic; keep code clean, modular, reusable

## File Structure
```
/assets
  /images   (.webp, under 5MB)
  /videos   (.webm, under 15MB)
  /css      (one CSS file)
  /js       (one JS file)
```

## SEO
- Every page needs meta description and relevant keywords

## Restrictions — NEVER TOUCH
- Dockerfiles
- Nginx config files
- YAML (.yml) files

**Why:** Established engineering standards for clean separation of concerns, maintainability, and consistency.
**How to apply:** Every time writing or editing any frontend file — check HTML has no inline styles/scripts, CSS is external and class-based, JS is external and function-first. Always read the full file before editing and audit against these standards before finishing.
---
name: project-google-verification
description: Google Search Console site verification meta tags that must be included on all index pages
metadata: 
  node_type: memory
  type: project
  originSessionId: c554e36b-c0da-498f-ad4c-8f65e3e36ee1
---

Always include the following Google site verification meta tags inside the `<head>` of every `index.html` (or any index page):

**EPF Main Site:**
```html
<meta name="google-site-verification" content="Iym7A-OOP5EoEcMyk8ZbIvhj-B6OTdbLHE5IcW_kT3c" />
```

**Why:** Required for Google Search Console ownership verification for the Empire Partner Foundation website.

**How to apply:** Add these tags to the `<head>` section of any `index.html` file whenever creating or updating index pages, alongside any other meta tags.
