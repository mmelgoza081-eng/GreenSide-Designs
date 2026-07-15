# Getting this live on GitHub + Vercel/Netlify

This project no longer depends on Base44 at all — no SDK, no auth, no backend calls.
A few things need a couple minutes of setup before it's fully live:

## 1. Contact form → Formspree (free, ~2 min)
1. Go to https://formspree.io, sign up free, create a new form.
2. Set the notification email to wherever you want inquiries sent.
3. Copy your form endpoint (looks like `https://formspree.io/f/xxxxxxx`).
4. Paste it into `src/pages/Contact.jsx`, replacing `FORMSPREE_ENDPOINT`.

## 2. Stripe checkout → Payment Links (free, no backend)
1. In your Stripe Dashboard, go to Payment Links → + New.
2. Create one link for "Website Creation" ($400) and one for "Bundle Package" ($500).
3. Copy each link and paste them into `STRIPE_LINKS` at the top of `src/pages/Services.jsx`.
   (The "6-Month Moderation" plan links to the Contact page instead, since it reads more
   like a retainer conversation than a one-click buy — happy to make it a Payment Link too
   if you'd rather.)

## 3. Images currently hosted on Base44
A few images (hero laptop shot, about photo, service photos) are still pointed at
`media.base44.com` URLs. These may stop working if you cancel your Base44 subscription.
Worth downloading them and dropping them in a `public/images/` folder, then swapping the
URLs in `Home.jsx`, `About.jsx`, and `ValueProposition.jsx` — happy to do this if you upload
the images or send me the current site's live links.

## 4. Deploying
This is now a plain Vite + React app:
```
npm install
npm run dev      # local preview
npm run build    # production build → dist/
```
Push to GitHub, then import the repo on Vercel or Netlify (auto-detects Vite) — no
environment variables needed.

## What changed
- Removed the Base44 SDK, auth wrapper, and Login/Register/Admin pages entirely — the
  whole site no longer waits on Base44's servers to render even the homepage.
- Contact form now posts to Formspree instead of Base44's database + email integration.
- Stripe checkout buttons now link to Stripe Payment Links instead of a Base44 function.
- Simplified the homepage: removed five competing background gimmicks (confetti, a cartoon
  ocean scene, a space/nebula theme, rainbow floating shapes, a neon "energy" divider) that
  didn't match the site's actual green/serif brand, and unified everything to one calm,
  consistent visual language.
