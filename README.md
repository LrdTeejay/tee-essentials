# TEE ESSENTIALS – Unisex Fashion Store (React)

A Shopify-style clothing store: landing page, sign up / log in, a full shop dashboard with
filters and quick view, product pages with size guides, bag drawer, wishlist, discount codes,
checkout with **Paystack**, order history and account page.

- **Collections:** clothing, knitwear (cardigans), shoes (sneakers, cobblers, sandals, slippers, palms), bags, caps
- **Sizes:** S, M, L, XL, XXL, XXXL for clothing · EU 39–46 for shoes · S/M, L/XL or One size for caps and bags
- **Prices:** shown in US dollars by default, switchable in the header (NGN, GHS, KES, ZAR, GBP, EUR, CAD, AED) using daily exchange rates
- **Payments:** Paystack (charged in naira; checkout shows the exact naira amount) or pay on delivery in Nigeria
- **Look:** very light peach background, white cards, charcoal text, navy actions, camel highlights

Built with HTML, CSS, JavaScript and React 18 (Vite + React Router). Frontend only: accounts,
bags and orders are saved in each visitor's browser.

## Run it on your computer
```bash
npm install
cp .env.example .env      # paste ONLY your Paystack test key (pk_test_...) after the =
npm run dev               # open http://localhost:5173
```

## Product photos
Every product, collection tile and landing-page banner uses a real photo from **Unsplash**
(free for commercial use, no attribution required: https://unsplash.com/license). The photo ids
are in the `PHOTOS` list in `src/data/products.js`. Replace any of them with your own photos when
you have real stock (see `public/products/README.md`). Photos load from Unsplash's servers, so the
store needs an internet connection to show them.

## Put it online (GitHub Pages)
1. Create an **empty** GitHub repository named `tee-essentials`.
2. Open a terminal **inside this folder** (the one with `package.json`) and run:
   ```bash
   git init
   git add .
   git commit -m "TEE ESSENTIALS store"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/tee-essentials.git
   git push -u origin main
   ```
   Use Git, not drag-and-drop upload, so the hidden `.github` folder is included.
3. **Settings → Pages → Source: GitHub Actions** (ignore the Jekyll / Static HTML cards).
4. **Settings → Secrets and variables → Actions → New repository secret**:
   name `VITE_PAYSTACK_PUBLIC_KEY`, value = only your `pk_test_...` key.
5. **Actions → Deploy to GitHub Pages → Run workflow**. When both jobs are green, the store is live at
   `https://YOUR-USERNAME.github.io/tee-essentials/`

Every later `git push` redeploys automatically.

## Test checklist
- Sign up, then you land on the shop with prices in US dollars
- Switch the header currency to NGN or GBP: every price updates
- Quick add and the product page block sold-out sizes; the shoe size guide shows EU/UK/US
- Discount codes: `WELCOME10` (10% off) and `TEE5000` (₦5,000 off)
- Paystack test card from paystack.com/docs/payments/test-payments opens the receipt
