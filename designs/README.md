# Helios Ten-Chi - Design Files

## 📁 Project Structure

```
designs/
├── prototype/          # Interactive HTML/CSS/JS prototype
│   ├── index.html     # Main prototype file
│   ├── styles.css     # Complete styling system
│   └── script.js      # Interactive functionality
├── desktop/           # Desktop-specific mockups
├── mobile/            # Mobile-specific mockups
├── assets/            # Design assets (icons, images)
├── case-study/        # Behance case study document
└── README.md          # This file
```

## 🚀 Quick Start

### View the Prototype

1. **Open in Browser:**
   ```bash
   # Navigate to the prototype directory
   cd designs/prototype

   # Open index.html in your browser
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

2. **Or use a local server (recommended):**
   ```bash
   # Using Python 3
   cd designs/prototype
   python3 -m http.server 8000
   # Visit http://localhost:8000

   # Using Node.js
   npx serve
   ```

### For Figma Import

1. **Take Screenshots:**
   - Open the prototype in your browser at 1920x1080 resolution
   - Use full-page screenshot tools (e.g., Firefox's built-in screenshot, GoFullPage Chrome extension)
   - Save individual sections for easier importing

2. **Import to Figma:**
   - Create new Figma file
   - Drag and drop screenshots as reference
   - Use the designs as a guide to recreate with Figma's native tools
   - Extract colors using Figma's color picker
   - Match typography using system fonts

3. **Extract Design Tokens:**
   - See `styles.css` `:root` section for all CSS variables
   - Colors, spacing, radius values are all documented
   - Use these as your Figma styles foundation

## 🎨 Design System

### Colors

#### Primary Palette
- **Solar Yellow:** `#FDB813`
- **Energy Orange:** `#FF6B35`
- **Stellar Purple:** `#7B4FFE`
- **Success Green:** `#48BB78`
- **Accent Teal:** `#38B2AC`

#### Neutral Palette
- **Dark Background:** `#0A0E27`
- **Dark Card:** `#13182E`
- **Dark Surface:** `#1A1F3A`
- **Text Primary:** `#FFFFFF`
- **Text Secondary:** `#A0AEC0`

#### Gradients
- **Primary:** `linear-gradient(135deg, #FDB813 0%, #FF6B35 100%)`
- **Stellar:** `linear-gradient(135deg, #7B4FFE 0%, #5B3FD6 100%)`
- **Solar:** `linear-gradient(180deg, #FFE259 0%, #FFA751 100%)`

### Typography

**Font Stack:**
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

**Scale:**
- H1: 64px / 800 weight / 1.1 line height
- H2: 40px / 700 weight / 1.2 line height
- H3: 24px / 600 weight / 1.3 line height
- Body: 16px / 400 weight / 1.6 line height
- Small: 14px / 500 weight / 1.4 line height

### Spacing System

- XS: 0.5rem (8px)
- SM: 1rem (16px)
- MD: 1.5rem (24px)
- LG: 2rem (32px)
- XL: 3rem (48px)
- 2XL: 4rem (64px)

### Border Radius

- SM: 0.5rem (8px)
- MD: 1rem (16px)
- LG: 1.5rem (24px)
- XL: 2rem (32px)

### Shadows

- SM: `0 2px 8px rgba(0, 0, 0, 0.1)`
- MD: `0 4px 16px rgba(0, 0, 0, 0.2)`
- LG: `0 8px 32px rgba(0, 0, 0, 0.3)`
- Glow: `0 0 40px rgba(253, 184, 19, 0.3)`

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px - 1279px
- **Large Desktop:** 1280px+

## 🎯 Key Features

### Desktop Features
- Full navigation menu with smooth scrolling
- Animated solar background
- 4-column marketplace grid
- Side-by-side trading interface
- Advanced filtering system
- Hover state animations

### Mobile Features
- Collapsible navigation (hamburger menu)
- Single-column layouts
- Touch-optimized buttons (44px minimum)
- Swipeable cards
- Bottom-sheet modals
- Simplified statistics display

## 🔧 Interactive Elements

### Buttons
- **Primary:** Gradient background with hover lift
- **Secondary:** Transparent with border
- **Wallet:** Purple gradient with icon
- All buttons have loading states

### Cards
- **Hover:** Translate up 8px with shadow
- **Border:** Subtle white border with glow on hover
- **Badges:** Positioned absolutely in top-right

### Forms
- **Input Focus:** Yellow border highlight
- **Live Validation:** Real-time feedback
- **Auto-calculation:** Dynamic total updates

### Animations
- **Solar Pulse:** 4s ease-in-out infinite
- **Rays Rotate:** 20s linear infinite
- **Fade In Up:** 0.6s ease-out on scroll
- **Smooth Scrolling:** For anchor links

## 📊 Component Library

### Navigation Components
- Navbar with wallet connection
- Fixed header with scroll effects
- Mobile hamburger menu (hidden in mockup, ready for implementation)

### Hero Components
- Animated background
- Statistics grid
- Dual CTA buttons
- Badge labels

### Marketplace Components
- Listing cards with images
- Verification badges
- Detail panels
- Meta tags
- Action buttons

### Trading Components
- Price ticker
- Order form
- Tab switcher
- Summary panel

### Content Components
- Feature cards with icons
- Step cards with numbers
- Stat cards with icons
- Testimonial cards (ready for content)

### Footer Components
- Multi-column layout
- Brand section
- Link groups
- Social links

## 🖼️ Asset Guidelines

### Icons
- Use SVG for all icons (scalable, colorable)
- 24x24px default size
- Stroke width: 2px
- Color: currentColor for theme compatibility

### Images
- Use WebP format for best compression
- Provide 1x, 2x, 3x versions for retina
- Lazy load below-the-fold images
- Placeholder colors from gradient palette

### Logos
- SVG format for all screen sizes
- Minimum size: 32x32px
- Include gradient definitions inline
- Provide monochrome version for special cases

## 🎬 Animation Guidelines

### Micro-interactions
- Button hover: 0.3s ease
- Card hover: 0.3s ease-out
- Input focus: 0.2s ease
- Tab switch: 0.3s ease

### Page Transitions
- Scroll reveal: 0.6s ease-out
- Number counting: 2s ease-out
- Loading states: 1.5s

### Performance
- Use CSS transforms over position changes
- Prefer opacity over visibility
- Limit animations to 60fps
- Use `will-change` sparingly

## 📋 Checklist for Figma Recreation

### Setup
- [ ] Create new Figma file
- [ ] Set up color styles from palette above
- [ ] Create text styles for typography scale
- [ ] Set up spacing/grid system (8px base)
- [ ] Import any custom fonts if needed

### Pages
- [ ] Hero section with animated background concept
- [ ] Features grid (4 cards)
- [ ] Marketplace section (4+ listing cards)
- [ ] Trading interface (split layout)
- [ ] How it works (3 steps)
- [ ] Stats section (4 stats)
- [ ] CTA section
- [ ] Footer (4 columns)

### Components
- [ ] Button variants (primary, secondary, wallet)
- [ ] Card components (feature, listing, step, stat)
- [ ] Form elements (input, label, suffix)
- [ ] Icons (convert SVGs to Figma vectors)
- [ ] Badges (verified, hot, new)
- [ ] Navigation items

### Mobile Versions
- [ ] Mobile hero (stacked layout)
- [ ] Mobile navigation (hamburger)
- [ ] Single-column grids
- [ ] Touch-sized buttons
- [ ] Simplified stats

### Prototyping
- [ ] Link navigation items to sections
- [ ] Button hover states
- [ ] Card interactions
- [ ] Tab switching animation
- [ ] Wallet connection flow

## 🎓 Learning Resources

### Stellar Blockchain
- [Stellar Documentation](https://developers.stellar.org/)
- [Stellar Laboratory](https://laboratory.stellar.org/)
- [Freighter Wallet](https://www.freighter.app/)

### Design Resources
- [Solar Energy UI Inspiration](https://dribbble.com/tags/solar-energy)
- [Blockchain Design Patterns](https://www.web3designprinciples.com/)
- [Color Theory for Energy](https://www.canva.com/colors/color-meanings/)

### Development
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Responsive Design](https://web.dev/responsive-web-design-basics/)
- [Web Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

## 💡 Tips for Behance Presentation

### Layout Suggestions
1. **Cover Image:** Hero section with logo and tagline
2. **Project Overview:** Brief description with key metrics
3. **Problem Statement:** Solar market challenges
4. **Research:** User insights and competitive analysis
5. **Design Process:** Sketches, wireframes, iterations
6. **Design System:** Color palette, typography, components
7. **Desktop Screens:** Full-page mockups
8. **Mobile Screens:** Key screens side-by-side
9. **Interactive Demo:** GIF or video of prototype
10. **Results:** Impact metrics and user feedback
11. **Next Steps:** Future enhancements

### Image Specifications
- **Width:** 1400px (Behance optimal)
- **Format:** JPG (high quality) or PNG (with transparency)
- **File Size:** <2MB per image
- **Annotations:** Add callouts explaining design decisions

### Writing Style
- Start with hook/interesting fact
- Use short paragraphs
- Include statistics and data
- Show, don't just tell
- End with impact/results

## 🔗 External Links

**Stellar Resources:**
- [Stellar Network](https://stellar.org)
- [Stellar Quest](https://quest.stellar.org)
- [Stellar Community](https://discord.com/invite/stellardev)

**Design Inspiration:**
- [Awwwards - Web3](https://www.awwwards.com/websites/web3/)
- [Dribbble - Blockchain](https://dribbble.com/tags/blockchain)
- [Behance - FinTech](https://www.behance.net/search/projects?search=fintech)

## 📞 Support

For questions or clarifications about the design:
1. Review the case study document in `case-study/BEHANCE_CASE_STUDY.md`
2. Check the CSS comments in `prototype/styles.css`
3. Inspect the interactive prototype for implementation details

## 📄 License

This design concept is created for portfolio and demonstration purposes.
All brand names and trademarks belong to their respective owners.

---

**Last Updated:** November 2024
**Version:** 1.0
**Status:** Ready for Figma/Behance
