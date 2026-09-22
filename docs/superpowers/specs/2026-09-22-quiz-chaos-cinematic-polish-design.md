# Quiz Chaos Cinematic Polish

Date: 2026-09-22
Status: Approved

## Goal

Refine the existing Quiz Chaos landing page so it feels more animated and professional, without changing brand, copy, or conversion path.

Approach: GSAP + ScrollTrigger (CDN). No paid plugins.

## Keep

- Dark red cinematic identity (`#e50914`, cream ink, vine CTAs)
- Bebas Neue / Cinzel / Source Sans 3
- Static HTML + CSS + JS on GitHub Pages
- Same sections, APK links, SEO/JSON-LD
- Content visible with JS disabled

## Motion

- Hero: letter stagger on QUIZ CHAOS, then kicker/sub/CTAs
- Scroll: fade-up section heads; stagger stats, modes, houses, steps, shots, FAQ
- Light parallax on fog orbs and dragon stage (no pin, no scroll-jacking)
- Magnetic Download buttons on fine pointers
- Header glass + compact scrolled state + thin scroll progress
- Smoother dragon crossfade
- FAQ chevron rotate
- `prefers-reduced-motion`: no GSAP, no infinite pulse, instant states

## Visual polish

- Stronger card elevation and hover
- Screenshot tiles with depth on hover
- Ambient fog orbs
- Visible focus rings, 44px targets, no emoji icons

## Files

- `index.html` — GSAP scripts, motion hooks, fog orbs, progress bar
- `css/site.css` — elevation, header, reduced-motion, hover
- `js/site.js` — GSAP choreography + existing nav/dragon
- `404.html` — matching polish only
