# Sweet Toppers 🎂

A mobile-friendly storefront for **cake topper video tutorials**. Customers can
buy a single tutorial as a one-time purchase (cheaper than the subscription) or
subscribe for unlimited access to the whole library. Built with **React + Vite +
Tailwind CSS** and **Firebase** (Google sign-in + Firestore).

## ✨ Features

- **Hero / about** section with the brand logo and a description of the service.
- **Tutorials grid** — each topper shows a looping 3-second MP4 preview of the
  finished result, its one-time price, and an **Add to cart** button.
- **Cart drawer + checkout** → a **dummy paywall** (placeholder card form). The
  real payment provider plugs in later in one place.
- **Login-gated checkout** — checkout only asks the customer to **sign in with
  Google**. After sign-in + (dummy) payment, the purchased tutorial unlocks.
- **Purchased tutorials reveal a YouTube player** — the full video link is only
  shown to people who bought it (or subscribers).
- **Subscription plan** that unlocks every tutorial.
- **Services**, **customer testimonials** (placeholder), and a **Suggestions**
  form where customers pitch topper ideas the owner can use as inspiration.
- **Contact** with Facebook, Instagram, WhatsApp, TikTok, phone & email.
- **Brand palette**: soft **pink** + **champagne**, responsive on mobile.

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. Out of the box the app runs in **demo mode**: login
and purchases are simulated with `localStorage`, so you can click through the
entire flow (add to cart → checkout → sign in → pay → watch) with no backend.

### Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## 🔥 Going live with Firebase

1. Create a project at <https://console.firebase.google.com>.
2. **Authentication → Sign-in method →** enable **Google**.
3. **Firestore Database →** create a database.
4. **Project settings → Your apps →** register a Web app and copy the config.
5. Copy `.env.example` to `.env` and fill in the `VITE_FIREBASE_*` values.
6. Restart `npm run dev`. The demo banner disappears and real Google sign-in +
   Firestore are now used.
7. Deploy the Firestore security rules in `firestore.rules`:
   ```bash
   firebase deploy --only firestore:rules
   ```

> **Note on the paywall:** payment is currently a placeholder
> (`handlePay` in `src/components/CheckoutModal.jsx`). For real charges, drop in
> Stripe / PayHere / etc. there and only call `completeCheckout()` after the
> provider confirms payment. For production, record entitlements from a trusted
> server (Cloud Function webhook) rather than the client.

## 🛠️ How the owner manages content

All owner-editable content lives in plain files — no code needed beyond editing
these:

- **Tutorials / prices / YouTube links:** `src/data/products.js`
  - `price` — the one-time price.
  - `video` — path to the looping preview MP4 (see `public/videos/`).
  - `youtubeId` — the full tutorial video, revealed only after purchase.
    (All tutorials currently point to the same demo video.)
- **Brand info, subscription price, services, contacts/socials:** `src/data/site.js`
- **Testimonials:** `src/data/testimonials.js`
- **Preview videos:** drop MP4s into `public/videos/` (filenames in its README).

### Uploading a new tutorial

1. Upload the full lesson to YouTube (can be **Unlisted**).
2. Add an entry to `products.js` with the new `youtubeId` and a `price`.
3. Add a 3s preview MP4 to `public/videos/` (or leave it — a placeholder shows).

## 🗂️ Project structure

```
src/
  data/         products, site config, testimonials (owner-editable)
  context/      Auth, Cart/entitlements, UI (modals) providers
  lib/          firebase init + purchases service (Firestore or demo)
  components/   Navbar, Hero, Products, Subscription, Services,
                Testimonials, Suggestions, Contact, Footer,
                CartDrawer, CheckoutModal, TutorialModal
```
