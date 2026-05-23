# Eunice Ngosia Mukhebi - Portfolio of Evidence

A professional portfolio website showcasing the qualifications, ministry experience, and achievements of **Eunice Ngosia Mukhebi** — Praise & Worship Leader, Biblical Studies Scholar, and Ministry Administrator with 15+ years of dedicated service at Bungoma Bible School.

## About

This portfolio serves as a **Portfolio of Evidence (PoE)** for KNQF Level 6 RPL (Recognition of Prior Learning) in Christian Ministry & Chaplaincy. It presents:

- **15+ years** of ministry experience
- **Master's Degree** in Biblical Studies (GPA 3.66)
- **Complete academic journey** from certificates to graduate level
- **Professional achievements** and milestones
- **Testimonials** from colleagues and supervisors
- **Supporting documents**, certificates, and media

## Features

### 📄 Main Portfolio Page
- **Hero Section** - Professional introduction with portrait
- **Ministry Experience** - 5+ roles showcasing leadership and growth
- **Academic Qualifications** - Timeline of educational achievements
- **Skills & Competencies** - Proficiency levels in key areas
- **Reflective Journey** - Timeline of career milestones
- **Testimonials** - References from professional contacts
- **Contact Information** - Direct communication channels

### 📑 Dedicated Resume Page
- **Resume/CV** - Professional curriculum vitae
- **Certificates** - All academic degrees and certifications
- **Supporting Documents** - References, statements, and portfolios
- **Images Gallery** - Professional photos with lightbox viewer
- **Videos Section** - Worship recordings and ministry highlights
- **Testimonials** - Organized professional references
- **Achievements** - Key milestones and accomplishments

## Tech Stack

- **Frontend**: React 18+ with Hooks
- **Build Tool**: Vite
- **Styling**: CSS-in-JS (inline styles)
- **Fonts**: 
  - Cormorant Garamond (Display/Serif)
  - Jost (Sans-serif)
- **Design System**: Custom color palette and component library

## Color Palette

- Primary Brown: `#8B4513`
- Dark Brown: `#2C1A0E` / `#3d2b1f`
- Light Cream: `#FAF6F1`
- Warm Gold: `#C2956C`
- Neutral Beige: `#8B6A4F` / `#E8DDD4`

## Project Structure

```
├── public/
│   └── media/
│       ├── images/           # Professional photos
│       ├── resume/           # CV and resume files
│       ├── documents/        # Supporting documents (PDF, DOCX)
│       ├── certificates/     # Degree and certificate PDFs
│       └── videos/           # Ministry and worship videos
├── src/
│   ├── App.jsx              # Main portfolio component
│   ├── ResumePage.jsx       # Resume/portfolio of evidence page
│   ├── main.jsx             # React entry point
│   ├── App.css              # Global styles
│   └── index.css            # CSS resets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
└── vite.config.js          # Vite configuration
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build
```

## Components

### Core Components
- **App** - Main portfolio component with navigation and sections
- **ResumePage** - Dedicated resume and portfolio of evidence page
- **AnimatedSection** - Scroll-triggered fade-in animations
- **SkillBar** - Animated skill proficiency bars
- **DocumentCard** - File display with download/preview buttons
- **ImageGallery** - Responsive image grid with lightbox
- **VideoPlayer** - Responsive video containers
- **TabNavigation** - Tab-based section switching

### Reusable Utilities
- `useInView()` - Intersection Observer hook for animations
- Navigation system with smooth scrolling
- Responsive mobile menu

## Features in Detail

### Navigation
- Fixed header with smooth scrolling
- Desktop and mobile-responsive menus
- Navigation links: About, Ministry, Qualifications, Skills, Journey, Testimonials, Contact

### Responsive Design
- **Desktop**: Full multi-column layouts
- **Tablet**: Optimized grid adjustments
- **Mobile**: Single-column stack with hamburger menu

### Animations
- Smooth page transitions
- Scroll-triggered fade-in animations
- Hover effects on cards and buttons
- Skill bar animations

### Media Management
- Image gallery with lightbox viewer
- Video players with native controls
- Document download functionality
- File type icons and metadata display

## Adding Media

### Images
Add images to `/public/media/images/` folder. They will automatically appear in the Resume Page Images section.

### Documents & PDFs
- **Resume**: `/public/media/resume/`
- **Certificates**: `/public/media/certificates/`
- **Supporting Docs**: `/public/media/documents/`

### Videos
Add video files to `/public/media/videos/` folder and update the `videos` array in ResumePage.jsx.

## Customization

All content is configured through JavaScript data structures at the top of `App.jsx`:

- `NAV_LINKS` - Navigation menu items
- `QUALIFICATIONS` - Academic credentials
- `MINISTRY_ROLES` - Professional experience
- `SKILLS` - Competency ratings
- `TESTIMONIALS` - Reference quotes
- `JOURNEY_POINTS` - Career timeline

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy-loaded media
- Optimized animations
- Efficient component structure
- Fast development server with HMR

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Clear visual hierarchy
- High contrast colors
- Alt text for images

## Contact

**Eunice Ngosia Mukhebi**  
Bungoma Bible School  
Bungoma, Kenya

- **Phone**: 0711 296 177 / 0726 382 991
- **Email**: eunicengosia6@gmail.com
- **Address**: Along Bungoma-Mumias Road, P.O. Box 1962-50200, Bungoma, Kenya

## License

© 2026 Eunice Ngosia Mukhebi. All rights reserved.
