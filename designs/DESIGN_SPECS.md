# Helios Ten-Chi - Design Specifications

## 🎯 Quick Reference Guide

### Project Information
- **Project Name:** Helios Ten-Chi
- **Type:** Solar Energy Marketplace
- **Platform:** Web (Desktop + Mobile)
- **Technology:** Stellar Blockchain
- **Design Style:** Modern, Clean, Solar-themed
- **Theme:** Dark Mode with Warm Accents

---

## 🎨 Color Tokens

### CSS Variables
```css
/* Primary Colors */
--primary-yellow: #FDB813;
--primary-orange: #FF6B35;
--stellar-blue: #7B4FFE;
--success-green: #48BB78;
--accent-teal: #38B2AC;

/* Dark Theme */
--dark-bg: #0A0E27;
--dark-card: #13182E;
--dark-surface: #1A1F3A;

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #A0AEC0;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #FDB813 0%, #FF6B35 100%);
--gradient-stellar: linear-gradient(135deg, #7B4FFE 0%, #5B3FD6 100%);
--gradient-solar: linear-gradient(180deg, #FFE259 0%, #FFA751 100%);
```

### Color Usage

| Element | Color | Usage |
|---------|-------|-------|
| Background | `#0A0E27` | Main page background |
| Cards | `#13182E` | Card backgrounds |
| Surface | `#1A1F3A` | Elevated surfaces |
| Primary Actions | Gradient Primary | CTA buttons |
| Wallet Connect | Gradient Stellar | Blockchain actions |
| Success States | `#48BB78` | Verified badges, success |
| Links/Hover | `#FDB813` | Interactive elements |

---

## 📐 Spacing System

### Scale
```
2px   → micro spacing
4px   → hairline
8px   → xs (--spacing-xs)
16px  → sm (--spacing-sm) [Base unit]
24px  → md (--spacing-md)
32px  → lg (--spacing-lg)
48px  → xl (--spacing-xl)
64px  → 2xl (--spacing-2xl)
```

### Application
- **Component Padding:** 24px (md)
- **Card Padding:** 32px (lg)
- **Section Padding:** 64px (2xl) vertical
- **Grid Gap:** 32px (lg)
- **Element Gap:** 16px (sm)

---

## 🔤 Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
             Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Type Scale

| Style | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| Hero | 64px | 800 | 1.1 | Main headlines |
| H1 | 48px | 700 | 1.2 | Page titles |
| H2 | 40px | 700 | 1.2 | Section titles |
| H3 | 24px | 600 | 1.3 | Card titles |
| H4 | 20px | 600 | 1.4 | Subsections |
| Body Large | 18px | 400 | 1.6 | Hero subtitles |
| Body | 16px | 400 | 1.6 | Body text |
| Body Small | 14px | 500 | 1.4 | Labels |
| Caption | 12px | 600 | 1.3 | Tags, badges |

### Font Weights
- **Regular:** 400
- **Medium:** 500
- **Semibold:** 600
- **Bold:** 700
- **Extrabold:** 800

---

## 🎯 Component Specifications

### Buttons

#### Primary Button
```css
padding: 16px 32px
background: linear-gradient(135deg, #FDB813 0%, #FF6B35 100%)
border-radius: 16px
font-size: 16px
font-weight: 600
color: #FFFFFF
transition: all 0.3s ease
```
**Hover:** Transform translateY(-2px) + shadow glow

#### Secondary Button
```css
padding: 16px 32px
background: transparent
border: 2px solid rgba(255, 255, 255, 0.2)
border-radius: 16px
font-size: 16px
font-weight: 600
color: #FFFFFF
```
**Hover:** Border color → primary-yellow, background → rgba(253, 184, 19, 0.1)

#### Wallet Button
```css
padding: 12px 24px
background: linear-gradient(135deg, #7B4FFE 0%, #5B3FD6 100%)
border-radius: 16px
font-size: 16px
font-weight: 600
color: #FFFFFF
display: flex
align-items: center
gap: 8px
```

### Cards

#### Feature Card
```css
background: #13182E
padding: 48px
border-radius: 24px
border: 1px solid rgba(255, 255, 255, 0.05)
```
**Hover:** Transform translateY(-8px) + border glow

#### Listing Card
```css
background: #13182E
border-radius: 24px
border: 1px solid rgba(255, 255, 255, 0.05)
overflow: hidden
```
**Structure:**
- Image: 200px height
- Content padding: 24px
- Spacing: 16px between elements

#### Stat Card
```css
background: #13182E
padding: 48px
border-radius: 24px
text-align: center
```

### Forms

#### Input Field
```css
width: 100%
padding: 16px
background: rgba(255, 255, 255, 0.05)
border: 1px solid rgba(255, 255, 255, 0.1)
border-radius: 8px
color: #FFFFFF
font-size: 16px
```
**Focus:** Border color → primary-yellow

#### Label
```css
font-size: 14px
font-weight: 500
color: #A0AEC0
margin-bottom: 8px
```

### Badges

#### Verified Badge
```css
background: rgba(72, 187, 120, 0.9)
padding: 8px 16px
border-radius: 8px
font-size: 12px
font-weight: 700
color: #FFFFFF
```

#### Hot Badge
```css
background: rgba(255, 107, 53, 0.9)
/* Other properties same as Verified */
```

#### New Badge
```css
background: rgba(123, 79, 254, 0.9)
/* Other properties same as Verified */
```

---

## 🎭 Elevation System

### Shadows
```css
/* Level 1 - Subtle */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

/* Level 2 - Default */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

/* Level 3 - Elevated */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

/* Glow Effect */
box-shadow: 0 0 40px rgba(253, 184, 19, 0.3);

/* Hover State */
box-shadow: 0 8px 20px rgba(253, 184, 19, 0.4);
```

### Z-Index Scale
```
0    → Base level
1    → Elevated cards
10   → Dropdowns
100  → Modals
1000 → Fixed navbar
10000 → Notifications
```

---

## 📏 Grid System

### Desktop Grid
```css
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 32px;
max-width: 1280px;
margin: 0 auto;
padding: 0 32px;
```

### Marketplace Grid
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 32px;
```

### Features Grid
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 32px;
```

---

## 📱 Responsive Breakpoints

### Media Queries
```css
/* Mobile */
@media (max-width: 480px) { }

/* Mobile to Tablet */
@media (max-width: 768px) { }

/* Tablet to Desktop */
@media (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1280px) { }
```

### Responsive Changes

| Element | Desktop | Mobile |
|---------|---------|--------|
| Hero Title | 64px | 32px |
| Section Padding | 64px vertical | 48px vertical |
| Grid Columns | 4 columns | 1 column |
| Navigation | Horizontal | Hamburger menu |
| Stats Display | 3 columns | 1 column |
| Button Width | Auto | Full width |

---

## 🎨 Icon System

### Icon Sizes
- **Small:** 16px × 16px
- **Default:** 24px × 24px
- **Medium:** 32px × 32px
- **Large:** 40px × 40px
- **Feature:** 64px × 64px

### Icon Style
```css
stroke-width: 2px
fill: none (outlined)
stroke: currentColor
```

### Icon Colors
- **Primary Actions:** Inherit button color
- **Feature Icons:** Theme color (yellow, purple, teal, green)
- **Navigation:** Text secondary (#A0AEC0)
- **Active State:** Primary yellow (#FDB813)

---

## 🎬 Animation Specifications

### Timing Functions
```css
--ease-default: ease
--ease-in: ease-in
--ease-out: ease-out
--ease-in-out: ease-in-out
```

### Duration Scale
```css
--duration-fast: 0.2s     /* Input focus, quick feedback */
--duration-base: 0.3s     /* Hover states, transitions */
--duration-slow: 0.6s     /* Scroll animations */
--duration-slower: 1s     /* Loading states */
```

### Common Animations

#### Fade In Up
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Pulse (Solar animation)
```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}
```

#### Rotate (Rays animation)
```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 🎯 Interaction States

### Buttons
- **Default:** Gradient background
- **Hover:** Lift 2px + shadow glow
- **Active:** Scale 0.98
- **Disabled:** Opacity 0.5, cursor not-allowed
- **Loading:** Spinner animation

### Cards
- **Default:** Static with subtle border
- **Hover:** Lift 8px + border glow
- **Active:** No change
- **Focus:** Border color → primary

### Links
- **Default:** Text secondary color
- **Hover:** Primary yellow + underline
- **Active:** Primary orange
- **Visited:** No distinction

### Form Inputs
- **Default:** Subtle background
- **Hover:** Border brightness increase
- **Focus:** Yellow border + outline
- **Error:** Red border
- **Success:** Green border

---

## 📐 Layout Specifications

### Section Structure
```
Section Wrapper
├── Container (max-width: 1280px)
    ├── Section Header
    │   ├── Section Title
    │   └── Section Subtitle
    └── Section Content
        └── Grid/Flex Layout
```

### Page Layout
```
├── Fixed Navigation (80px height)
├── Hero Section (600px+ height)
├── Features Section
├── Marketplace Section
├── Trading Section
├── How It Works Section
├── Stats Section
├── CTA Section
└── Footer
```

### Navigation Bar
```
Height: 80px
Padding: 24px 0
Position: fixed
Z-index: 1000
Background: rgba(10, 14, 39, 0.9)
Backdrop filter: blur(20px)
```

---

## 🎨 Image Guidelines

### Listing Images
- **Aspect Ratio:** 16:9
- **Height:** 200px (fixed)
- **Format:** WebP preferred, JPG fallback
- **Quality:** 80%
- **Loading:** Lazy load below fold

### Logo
- **Format:** SVG
- **Sizes:** 32px (mobile), 40px (desktop)
- **Colors:** Gradient (primary)
- **Variants:** Full color, monochrome

### Background Images
- **Solar animation:** CSS-based, no image
- **Patterns:** Minimal, subtle
- **Gradients:** Radial, low opacity

---

## 📊 Data Visualization

### Price Chart (Future)
- **Type:** Line chart
- **Colors:** Yellow for positive, Red for negative
- **Grid:** Subtle, secondary color
- **Tooltips:** Dark card with white text

### Statistics Display
```
Number: 40px, bold, gradient text
Label: 14px, secondary color
Icon: 40px, theme color
```

---

## ♿ Accessibility

### Contrast Ratios
- **Text on Dark BG:** 15:1 (AAA)
- **Secondary Text:** 7:1 (AA)
- **Interactive Elements:** 4.5:1 minimum

### Focus Indicators
```css
outline: 2px solid #FDB813
outline-offset: 2px
```

### Touch Targets
- **Minimum Size:** 44px × 44px
- **Spacing:** 8px between targets
- **Mobile Buttons:** Full width or minimum 48px height

### ARIA Labels
- All interactive elements have labels
- Form inputs have associated labels
- Icons have descriptive titles
- Images have alt text

---

## 🚀 Performance Targets

### Load Times
- **First Contentful Paint:** <1s
- **Time to Interactive:** <2s
- **Total Load Time:** <3s

### Optimization
- **CSS:** Minified, critical path inlined
- **JavaScript:** Deferred, async where possible
- **Images:** Lazy loaded, compressed
- **Fonts:** System fonts (no external load)

### Lighthouse Scores
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

---

## 📝 Content Guidelines

### Tone of Voice
- **Professional** yet approachable
- **Technical** when necessary, simple by default
- **Confident** about technology
- **Optimistic** about sustainability

### Writing Style
- **Headlines:** Action-oriented, benefit-focused
- **Body:** Clear, concise, scannable
- **CTAs:** Specific, urgent when appropriate
- **Tooltips:** Brief explanations, max 1-2 sentences

### Stellar Blockchain References
- Always mention "Stellar blockchain" or "Stellar network"
- Highlight speed (3-5 seconds)
- Emphasize low fees (~$0.00001)
- Note environmental friendliness

---

## 🔧 Development Handoff

### Deliverables
✅ HTML prototype (index.html)
✅ CSS stylesheet (styles.css)
✅ JavaScript functionality (script.js)
✅ Design system documentation
✅ Component specifications
✅ Responsive breakpoints
✅ Animation details
✅ Asset guidelines

### Tools Needed
- Modern browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Local server for testing
- Stellar testnet account (for real integration)

### Next Steps
1. Review prototype in browser
2. Test responsive behavior
3. Import design tokens to Figma
4. Create reusable components
5. Export assets for Behance
6. Prepare case study presentation

---

## 📞 Questions & Support

### Common Questions

**Q: Can I change the color scheme?**
A: Yes, all colors are CSS variables in `:root`. Update there for global changes.

**Q: How do I make it work with real Stellar wallets?**
A: Integrate Stellar SDK and wallet libraries (Freighter, Albedo). See Stellar docs.

**Q: Can I use this for a real product?**
A: This is a design prototype. Real implementation requires backend, smart contracts, etc.

**Q: How do I export for Behance?**
A: Take full-page screenshots at 1400px width, annotate in Figma/Photoshop.

---

**Version:** 1.0
**Last Updated:** November 2024
**Status:** Complete
