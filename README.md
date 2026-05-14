# BlogX Theme for Ghost CMS

**Version 2.0.0** - Refactored from AURA

A high-velocity, technical Ghost theme inspired by SpaceX, Vercel, and Linear. Sharp, tactical, and precision-engineered for modern SaaS and systems engineering content.

![BlogX Theme Preview](https://via.placeholder.com/1200x675/020203/00f2ff?text=BlogX+Theme+Preview)

---

## Design Philosophy

**"High-Velocity Content Architecture"**

BlogX transforms the soft, cinematic AURA aesthetic into:
- Sharp, geometric surfaces
- Tactical 1px borders
- Terminal-style metadata
- Technical typography hierarchy
- Minimal blur (only where strategic)
- Diagonal grid backgrounds
- Electric Blue (#00f2ff) + Cyber Lime (#ccff00) accents

---

## Migration from AURA

### What Changed

| AURA (v1) | BlogX (v2) |
|-----------|------------|
| Glassmorphic blur-heavy | Sharp bordered surfaces |
| 12px+ border radius | 4px max radius |
| Radial gradient backgrounds | Diagonal grid patterns |
| Floating particles | Tactical grid engine |
| Soft glow effects | 1px accent borders |
| Space Grotesk font | Inter + JetBrains Mono |
| Cyan/Purple/Pink palette | Electric Blue + Cyber Lime |

### What Was Preserved

- Ghost Handlebars template structure
- CSS variable architecture
- JavaScript interaction foundations
- Semantic HTML and accessibility
- SEO meta tags and Open Graph
- Responsive grid system

---

## Folder Structure

```
blogx-theme/
├── assets/
│   ├── css/style.css         # Complete design system
│   ├── js/main.js            # Grid engine + tilt interactions
│   └── images/favicon.svg    # Theme favicon
├── partials/
│   ├── footer.hbs            # 4-column technical footer
│   ├── navigation.hbs        # Fixed tactical header with CTA
│   ├── newsletter-cta.hbs    # Terminal-style subscription
│   └── pagination.hbs        # Pagination component
├── index.hbs                 # Homepage with "X-Factor" hero
├── post.hbs                  # Editorial article layout
├── default.hbs               # Main layout template
├── page.hbs, tag.hbs, author.hbs, error.hbs
├── package.json              # Theme configuration
└── README.md                 # This file
```

---

## Installation

### Option 1: Ghost Admin Upload

1. Zip the theme folder
2. Go to **Settings → Design → Change theme**
3. Click **Upload theme** and select the ZIP
4. Activate BlogX

### Option 2: Ghost CLI

```bash
ghost install ./blogx-theme
```

---

## New Design System

### Color Palette

```css
:root {
  /* Core */
  --color-bg-primary: #020203;
  --color-accent-primary: #00f2ff;  /* Electric Blue */
  --color-accent-secondary: #ccff00; /* Cyber Lime */

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.12);
}
```

### Typography

- **Body**: Inter
- **Mono** (metadata, labels, UI): JetBrains Mono
- Max border-radius: 4px

### Components

- **Cards**: Hard-surface with 2px accent hover line
- **Navigation**: Fixed, sharp edges, monospace links
- **Hero**: Terminal-status badge, diagonal grid background
- **Articles**: Terminal metadata bar, sharp editorial layout

---

## JavaScript Features

### Grid Background Engine

Replaces dreamy particles with tactical diagonal grid.

### Tactical Tilt System

Upgrade from magnetic hover to X/Y tilt with spring easing:
```html
<article class="card" data-tilt>...</article>
```

### Intersection Observer Animations

Minimal fade-in/fade-in-up with 120ms transitions.

---

## Customization

### Change Accent Colors

```css
:root {
  --color-accent-primary: #00f2ff;
  --color-accent-secondary: #ccff00;
}
```

### Add Custom Fonts

1. Add to `default.hbs`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=YourFont" rel="stylesheet">
   ```
2. Update CSS:
   ```css
   --font-body: 'YourFont', sans-serif;
   ```

---

## SEO & Accessibility

- Semantic HTML5 structure
- Open Graph + Twitter Cards
- Skip-to-content link
- Reduced motion support (`prefers-reduced-motion`)
- ARIA labels on interactive elements

---

## Performance

- No frameworks
- Minimal JS (~3KB)
- CSS variables (no runtime parsing)
- Lazy loading images
- GPU-accelerated transforms

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Credits

- **Theme**: BlogX Design System
- **Typography**: Inter, JetBrains Mono
- **Inspiration**: SpaceX, Vercel, Linear

---

## License

MIT License

---

*Designed for developers who ship.*
*High-velocity content architecture.*