# Feroz's Portfolio Website

A modern, responsive multi-page portfolio website built with pure HTML, CSS, and vanilla JavaScript. Features include dark mode, XML-driven dynamic content, and a clean minimal design.

## Features

- **Multi-page Architecture**: Separate pages for Home, About, Projects, and Contact
- **Dynamic Content**: Skills and projects loaded from XML files
- **Dark Mode**: Persistent theme toggle with localStorage
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **SEO Optimized**: Meta tags, JSON-LD schema, and sitemap.xml
- **Progressive Enhancement**: Works without JavaScript for core content

## Project Structure

```
/
├── index.html              # Home page
├── about.html              # About page with skills
├── projects.html           # Projects listing with filters
├── contact.html            # Contact form
├── projects/
│   ├── project-1.html      # E-Commerce Platform detail
│   └── project-2.html      # Task Management App detail
├── components/
│   ├── header.html         # Reusable header component
│   └── footer.html         # Reusable footer component
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles with CSS variables
│   ├── js/
│   │   ├── include.js      # Component injection logic
│   │   ├── nav.js          # Navigation and active link highlighting
│   │   ├── theme.js        # Dark/light mode toggle
│   │   ├── skills.js       # XML skills loader
│   │   ├── projects.js     # XML projects loader and filtering
│   │   └── contact.js      # Form validation
│   ├── images/
│   │   ├── hero-placeholder.jpg
│   │   ├── proj1-thumb.jpg
│   │   └── proj2-thumb.jpg
│   └── data/
│       ├── skills.xml      # Skills data
│       └── projects.xml    # Projects data
├── resume.pdf              # Resume download
├── sitemap.xml             # SEO sitemap
└── README.md               # This file
```

## Running Locally

### On Replit (Recommended)

This project is optimized for Replit. Simply click the **Run** button, or use:

```bash
python3 -m http.server 5000
```

The site will be available at the Replit-provided preview URL (port 5000).

### On Your Local Machine

1. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

2. Start a simple HTTP server:
   
   **Python 3:**
   ```bash
   python3 -m http.server 8080
   ```
   
   **Python 2:**
   ```bash
   python -m SimpleHTTPServer 8080
   ```
   
   **Node.js (if you have npx):**
   ```bash
   npx http-server -p 8080
   ```

3. Open your browser and visit:
   ```
   http://localhost:8080
   ```

## Customization Guide

### Adding a New Project

1. **Update projects.xml**:
   ```xml
   <project id="4" slug="project-4">
     <title>Your Project Name</title>
     <summary>Brief description</summary>
     <thumbnail>/assets/images/project4-thumb.jpg</thumbnail>
     <tech>React</tech>
     <tech>Node.js</tech>
   </project>
   ```

2. **Create project detail page**:
   - Copy `projects/project-1.html` as a template
   - Save as `projects/project-4.html` (use the slug from XML)
   - Update content, images, and technologies

3. **Add thumbnail image**:
   - Place image in `assets/images/`
   - Update the `<thumbnail>` path in XML

### Updating Skills

Edit `assets/data/skills.xml`:

```xml
<category name="Your Category">
  <skill name="Skill Name" level="85" />
</category>
```

The `level` attribute should be a number between 0-100 representing proficiency.

### Changing Color Scheme

Edit CSS variables in `assets/css/styles.css`:

```css
:root {
  --bg: #ffffff;
  --surface: #f7f8fa;
  --text: #0b1220;
  --muted: #6b7280;
  --accent: #00c2ff;
  --accent-2: #06b6d4;
}

[data-theme="dark"] {
  /* Dark mode overrides */
}
```

### Configuring Contact Form

The contact form currently uses client-side validation only. To enable actual email delivery:

#### Option 1: Formspree

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form and get your form endpoint
3. Update the form in `contact.html`:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Remove or modify `contact.js` validation as needed

#### Option 2: Netlify Forms

1. Deploy to Netlify
2. Add `netlify` attribute to the form:
   ```html
   <form name="contact" netlify>
   ```
3. Netlify will automatically handle submissions

#### Option 3: Custom Backend

Send form data to your own API endpoint by modifying `assets/js/contact.js`:

```javascript
const response = await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
});
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **Vanilla JavaScript**: ES6+ features, Fetch API, DOM manipulation
- **XML**: Structured data storage
- **Python**: Simple HTTP server for development

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Lazy loading for images
- Deferred JavaScript loading
- CSS-only animations
- Minimal dependencies (zero external libraries)
- Optimized asset loading

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Color contrast compliance (WCAG AA)

## SEO Features

- Unique page titles and meta descriptions
- Canonical URLs
- JSON-LD structured data
- sitemap.xml
- Semantic HTML
- Fast page load times

## Future Enhancements

- Blog section with XML-driven posts
- Image gallery/lightbox
- Animations and transitions
- Analytics integration
- Progressive Web App (PWA) features
- Additional project detail pages

## License

This project is open source and available under the MIT License.

## Contact

- Email: feroz@example.com
- GitHub: [@feroz](https://github.com)
- LinkedIn: [Feroz Developer](https://linkedin.com)

---

Built with ❤️ using only HTML, CSS, and JavaScript
