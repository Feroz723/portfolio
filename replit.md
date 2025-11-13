# Feroz's Portfolio Website

## Overview

A modern, multi-page static portfolio website showcasing a full-stack developer's work. Built entirely with vanilla HTML, CSS, and JavaScript, the site features a clean minimal design with dark mode support, dynamic content loading from XML data sources, and progressive enhancement principles. The portfolio includes home, about, projects listing, contact form, and individual project detail pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Multi-Page Static Site Pattern**
- Problem: Need a professional portfolio that works without a backend server
- Solution: Static HTML pages with shared components injected via JavaScript
- Rationale: Simple deployment on static hosts like Replit, no build step required, works with JavaScript disabled for core content
- Components: Reusable header and footer loaded dynamically via `include.js`

**Progressive Enhancement**
- Problem: Ensure accessibility and basic functionality without JavaScript
- Solution: Core content in HTML with JavaScript enhancing the experience
- Implementation: `<noscript>` fallbacks for critical content, semantic HTML structure
- Benefits: SEO-friendly, accessible, resilient to script loading failures

**Theme System**
- Problem: Users need both light and dark viewing modes
- Solution: CSS custom properties with `data-theme` attribute toggling
- Storage: LocalStorage for theme persistence across sessions
- Implementation: `theme.js` manages theme switching, CSS variables define color schemes

**Component-Based Structure**
- Problem: Avoid duplicating header/footer across pages
- Solution: Separate HTML components fetched and injected client-side
- Files: `/components/header.html`, `/components/footer.html`
- Loader: `include.js` uses Fetch API to load and inject components
- Event System: Custom `componentsLoaded` event signals when components are ready

**Navigation System**
- Mobile: Hamburger menu with slide-out navigation
- Desktop: Horizontal navigation bar
- Active State: JavaScript highlights current page link based on URL path
- Accessibility: ARIA labels, keyboard navigation (Escape to close menu)

**Data-Driven Content**
- Problem: Separate content from presentation for easier updates
- Solution: XML files store structured data (skills, projects)
- Loaders: Dedicated JavaScript modules (`skills.js`, `projects.js`) parse XML via DOMParser API
- Benefits: Content updates without touching code, structured data format

### Data Management

**XML Data Sources**
- `/assets/data/skills.xml`: Skill categories, names, and proficiency levels
- `/assets/data/projects.xml`: Project metadata, technologies, descriptions, thumbnails
- Choice Rationale: Human-readable format, no backend needed, easy to validate structure
- Parsing: Browser native DOMParser for XML to DOM conversion

**Project Filtering System**
- Problem: Users need to find projects by technology
- Solution: Client-side filtering using Set data structure for active filters
- Implementation: Extract unique technologies from XML, render filter chips, update display on filter changes
- Performance: All filtering happens in-memory, no server requests

**Form Handling**
- Contact Form: Client-side validation with visual feedback
- Validation: Email regex pattern, required field checks, minimum message length
- User Feedback: Success/error messages displayed inline
- Note: Form currently logs to console (backend integration point for future)

### Styling Architecture

**CSS Custom Properties (Variables)**
- Light Theme: Clean whites, grays, cyan accent colors
- Dark Theme: Dark blues/grays, teal accent colors
- Transition: Smooth color transitions when switching themes
- Benefit: Single source of truth for colors, easy theme management

**Responsive Design**
- Mobile-First: Base styles for mobile, media queries for larger screens
- Breakpoints: Adjust layout, navigation, and grid columns based on viewport
- Flexible Grid: CSS Grid for project cards, flexbox for navigation

**Component Styling**
- Cards: Project and skill display with consistent padding, shadows, hover states
- Buttons: Primary (accent color) and secondary (outline) variants
- Forms: Consistent input styling with focus states and validation feedback
- Typography: System font stack for performance, clear hierarchy with headings

### File Organization

**Asset Structure**
- `/assets/css/`: Single stylesheet with all styles and themes
- `/assets/js/`: Modular JavaScript files by feature (theme, nav, projects, skills, contact, include)
- `/assets/images/`: Project thumbnails and hero images
- `/assets/data/`: XML data sources

**Page Structure**
- Root Level: Main pages (index, about, projects, contact)
- `/projects/`: Individual project detail pages
- `/components/`: Reusable header and footer HTML fragments

**Naming Conventions**
- Files: Kebab-case (e.g., `project-1.html`, `styles.css`)
- IDs: Kebab-case (e.g., `theme-toggle`, `projects-grid`)
- CSS Classes: Kebab-case (e.g., `skill-category`, `cta-button`)

### SEO and Performance

**Meta Tags**
- Unique titles and descriptions per page
- Canonical URLs to prevent duplicate content issues
- JSON-LD structured data for homepage

**Optimization**
- Image Loading: `loading="lazy"` for below-fold images, `loading="eager"` for hero images
- Font Loading: System fonts to avoid web font download delay
- CSS: Single file to minimize HTTP requests
- JavaScript: Modular files loaded as needed

**Accessibility**
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`
- ARIA Labels: Button roles, aria-expanded states, aria-labels for icon links
- Keyboard Navigation: Focus management, escape key handlers
- Color Contrast: Meets WCAG standards in both themes

## External Dependencies

**None** - The application is entirely self-contained with no external dependencies:

- No CSS frameworks (Bootstrap, Tailwind, etc.)
- No JavaScript frameworks (React, Vue, etc.)
- No build tools (Webpack, Vite, etc.)
- No package managers (npm, yarn, etc.)
- No CDN resources (all assets served locally)

**Browser APIs Used:**
- Fetch API: Loading component HTML and XML data files
- DOMParser API: Parsing XML data into DOM structures
- LocalStorage API: Persisting theme preference
- Custom Events: Component loading coordination

**Deployment:**
- Static file server required (Replit provides this)
- No server-side processing needed
- No database required (all data in XML files)
- No authentication system (static portfolio only)