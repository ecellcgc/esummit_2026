# esummit-2026

E-Summit 2026 is the first-edition entrepreneurship summit of CGC Landran, bringing together founders, innovators, investors and aspiring entrepreneurs. Launched by E-Cell CGC to spark ideas, build connections and shape the future of startups.

This is the React version of the E-SUMMIT 2K26 website, converted from vanilla HTML/CSS/JS while preserving all design and animations.

## Features

- ✨ All original animations preserved (GSAP, Lenis, Canvas)
- 🎨 Complete design maintained
- 📱 Responsive layout
- 🎬 Video background with canvas text reveal
- ⏱️ Countdown timer
- 🎯 Smooth scrolling with Lenis
- 🎴 Flip cards and guest cards
- 📝 Registration form with Supabase integration

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
├── public/
│   ├── assets/          # All images
│   └── videoplayback.mp4 # Background video
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── Page1.jsx    # Hero page with countdown
│   │   ├── Page2.jsx    # About section
│   │   ├── Page3.jsx    # Marquee section
│   │   ├── Page4.jsx    # Why Attend (flip cards)
│   │   └── Page5.jsx     # Past Guests
│   ├── pages/
│   │   ├── Home.jsx     # Main page with all sections
│   │   └── Register.jsx # Registration page
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   ├── styles.css       # Main styles
│   # Auth (Register/Login) styles are Tailwind in Register.jsx & Login.jsx
└── package.json
```

## Technologies Used

- React 18
- React Router DOM
- GSAP (animations)
- Lenis (smooth scrolling)
- SplitType (text animations)
- Supabase (database)
- Vite (build tool)

## Notes

- All animations and design elements from the original project are preserved
- The video background and canvas animations work exactly as before
- Supabase configuration is in the Register component
- All assets should be placed in the `public/assets/` folder
