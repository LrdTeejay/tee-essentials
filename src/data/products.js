// ---------- Collections (each has a cover photo for the landing page) ----------
export const COLLECTIONS = [
  { id: 'clothing', name: 'Clothing', blurb: 'Tees, shirts, hoodies, cargos, jackets', tone: '#2b2b33', emoji: '👕', cover: '1489987707025-afc232f7ea0f' },
  { id: 'knitwear', name: 'Knitwear', blurb: 'Cardigans, sweaters, knit polos', tone: '#7a6450', emoji: '🧶', cover: '1582719188393-bb71ca45dbb9' },
  { id: 'shoes', name: 'Shoes', blurb: 'Sneakers, cobblers, sandals, slippers, palms', tone: '#1d2b6b', emoji: '👟', cover: '1765961999112-7aea89449b62' },
  { id: 'bags', name: 'Bags', blurb: 'Backpacks, crossbody, totes, duffels', tone: '#4a5240', emoji: '🎒', cover: '1553062407-98eeb64c6a62' },
  { id: 'caps', name: 'Caps', blurb: 'Baseball caps, bucket hats, beanies', tone: '#5a2a34', emoji: '🧢', cover: '1777455163879-92852416eb36' },
];

// ---------- Colours ----------
const C = {
  black: { name: 'Black', hex: '#1b1b1f' },
  white: { name: 'White', hex: '#f4f3ef' },
  cream: { name: 'Cream', hex: '#e9e1cf' },
  grey: { name: 'Heather grey', hex: '#9a9aa0' },
  navy: { name: 'Navy', hex: '#1f2a44' },
  olive: { name: 'Olive', hex: '#5d6b3a' },
  brown: { name: 'Brown', hex: '#6b4a2f' },
  sand: { name: 'Sand', hex: '#cdb894' },
  burgundy: { name: 'Burgundy', hex: '#6b2232' },
  denim: { name: 'Washed denim', hex: '#4b6a92' },
};

// ---------- Size sets ----------
export const APPAREL = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
export const SHOES = ['39', '40', '41', '42', '43', '44', '45', '46'];
export const CAPS = ['S/M', 'L/XL'];
export const ONE = ['One size'];

// ---------- Real product photos (free under the Unsplash License, unsplash.com/license) ----------
// Each id is an Unsplash photo id. To use your own photo instead, put a full image URL
// or a path like 'products/my-photo.jpg' (file in public/products/) in the list.
export const unsplash = (id, w = 900, h = 1200) =>
  id.startsWith('http') || id.startsWith('products/')
    ? id
    : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

const PHOTOS = {
  'heavyweight-tee': ['1583743814966-8936f5b7be1a', '1521572163474-6864f9cf17ab', '1581655353564-df123a1eb820'],
  'oversized-graphic-tee': ['1576566588028-4147f3842f27', '1778426140719-26f148a046ce', '1618354691373-d851c5c3a990'],
  'linen-shirt': ['1776838103951-993ff1ffc916', '1740711152088-88a009e877bb'],
  'essential-hoodie': ['1624548140129-74786c5f1279', '1620799140408-edc6dcb6d633'],
  'cargo-trousers': ['1776843370483-4f793bc14739', '1604072374690-0e7d7bddd54e'],
  'fleece-joggers': ['1604072374690-0e7d7bddd54e', '1445205170230-053b83016050'],
  'denim-jacket': ['1611312449408-fcece27cdbb7', '1772985451338-6bbc32aeedf1'],
  'varsity-jacket': ['1591047139829-d91aecb6caea', '1774413768903-057eb084133b', '1774413769417-29fde33e368b'],
  'chunky-cardigan': ['1760013531865-89ff324f83a6', '1601379327928-bedfaf9da2d0'],
  'v-neck-cardigan': ['1631541909061-71e349d1f203', '1760013529817-f50db943ffe2'],
  'crewneck-sweater': ['1578681994506-b8f463449011', '1760013529817-f50db943ffe2'],
  'knit-polo': ['1779907448384-bcd21af9bbbf', '1620799140408-edc6dcb6d633'],
  'low-top-sneakers': ['1718802319172-76d6ce3ba4d1', '1634671494478-18ae96453241', '1718802312665-d8219d8c64ed'],
  'retro-runners': ['1595950653106-6c9ebd614d3a', '1525966222134-fcfa99b8ae77', '1608231387042-66d1773070a5'],
  'leather-cobblers': ['1616406432452-07bc5938759d', '1662541089338-c7d53b88be70', '1615979474401-8a6a344de5bd'],
  'suede-cobblers': ['1576792741377-eb0f4f6d1a47', '1676121270762-47c8d3a7b9d5', '1556004583-d2aaffbba592'],
  'strap-sandals': ['1585120824848-8a5cd41493d2', '1628375385879-1af64230c2e1'],
  'slide-slippers': ['1603487742131-4160ec999306'],
  'leather-palms': ['1627388484741-74dcc56ec343', '1596523027665-9da35ced2388'],
  'woven-palms': ['1758274406801-53151bcb4af7', '1765961999112-7aea89449b62'],
  'rolltop-backpack': ['1553062407-98eeb64c6a62', '1547949003-9792a18a2601', '1581605405669-fcdf81165afa'],
  'crossbody-bag': ['1600857062241-98e5dba7f214', '1605733513597-a8f8341084e6'],
  'canvas-tote': ['1544816155-12df9643f363'],
  'weekender-duffel': ['1590874103328-eac38a683ce7', '1598532163257-ae3c6b2524b6'],
  'logo-cap': ['1588850561407-ed78c282e89b', '1592367630397-65872fe016e9', '1777455163879-92852416eb36'],
  'dad-cap': ['1521369909029-2afed882baee', '1534215754734-18e55d13e346', '1720534490358-bc2ad29d51d5'],
  'bucket-hat': ['1622445275576-721325763afe'],
  'rib-beanie': ['1556905055-8f358a7a47b2'],
};

const photos = (id) => (PHOTOS[id] || []).map((x) => unsplash(x));

// Short helper so each product below stays on a few lines
const p = (id, name, collection, category, price, extra) => ({
  id, name, collection, category, price, images: photos(id), rating: 4.6, reviews: 40, isNew: false, ...extra,
});

export const PRODUCTS = [
  // ---------- CLOTHING ----------
  p('heavyweight-tee', 'Essential Heavyweight Tee', 'clothing', 'Tees', 18000, {
    colors: [C.black, C.white, C.grey], sizes: APPAREL, emoji: '👕', tone: '#2b2b33', rating: 4.8, reviews: 412,
    description: 'Our signature tee in thick, structured cotton that holds its shape wash after wash.',
    details: ['240gsm organic cotton', 'Boxy fit, dropped shoulder', 'Embroidered TEE chest logo'],
    care: 'Machine wash cold, inside out. Do not tumble dry.' }),
  p('oversized-graphic-tee', 'Oversized Graphic Tee', 'clothing', 'Tees', 22000, {
    compareAt: 28000, colors: [C.black, C.cream], sizes: APPAREL, emoji: '👕', tone: '#e9e1cf', isNew: true,
    description: 'Roomy oversized tee with a screen-printed back graphic designed in Lagos.',
    details: ['220gsm cotton', 'Oversized fit: size down for a regular fit', 'Water-based print'],
    care: 'Wash inside out at 30°C. Iron on the reverse.' }),
  p('linen-shirt', 'Relaxed Linen Shirt', 'clothing', 'Shirts', 32000, {
    colors: [C.white, C.sand, C.olive], sizes: APPAREL, emoji: '👔', tone: '#cdb894', rating: 4.7, reviews: 96,
    description: 'A breathable camp-collar linen shirt built for hot afternoons and evenings out.',
    details: ['100% linen', 'Camp collar, relaxed fit', 'Coconut shell buttons'],
    care: 'Machine wash cold. Iron while damp.' }),
  p('essential-hoodie', 'Essential Pullover Hoodie', 'clothing', 'Hoodies', 38000, {
    colors: [C.black, C.grey, C.navy], sizes: APPAREL, emoji: '🧥', tone: '#9a9aa0', rating: 4.8, reviews: 233,
    description: 'Brushed-back fleece hoodie with a double-layer hood and kangaroo pocket.',
    details: ['400gsm cotton-poly fleece', 'Regular fit', 'Ribbed cuffs and hem'],
    care: 'Machine wash cold. Tumble dry low.' }),
  p('cargo-trousers', 'Utility Cargo Trousers', 'clothing', 'Trousers', 36000, {
    colors: [C.olive, C.black, C.sand], sizes: APPAREL, emoji: '👖', tone: '#5d6b3a', isNew: true,
    description: 'Straight-leg cargos with six pockets and adjustable ankle toggles.',
    details: ['Cotton ripstop', 'Elastic back waist with belt loops', 'Inside leg 80cm (size M)'],
    care: 'Machine wash cold.' }),
  p('fleece-joggers', 'Fleece Joggers', 'clothing', 'Trousers', 26000, {
    colors: [C.grey, C.black], sizes: APPAREL, emoji: '👖', tone: '#9a9aa0', rating: 4.5, reviews: 120,
    description: 'Tapered joggers in the same soft fleece as our hoodie.',
    details: ['Cotton-poly fleece', 'Drawcord waist, zip pockets', 'Cuffed ankles'],
    care: 'Machine wash cold.' }),
  p('denim-jacket', 'Washed Denim Jacket', 'clothing', 'Jackets', 58000, {
    colors: [C.denim, C.black], sizes: APPAREL, emoji: '🧥', tone: '#4b6a92', rating: 4.7, reviews: 64,
    description: 'A classic trucker jacket in rigid denim with a lived-in wash.',
    details: ['100% cotton denim, 13oz', 'Boxy fit', 'Two chest pockets'],
    care: 'Wash rarely, cold and inside out.' }),
  p('varsity-jacket', 'Varsity Bomber Jacket', 'clothing', 'Jackets', 72000, {
    compareAt: 85000, colors: [C.navy, C.burgundy], sizes: APPAREL, emoji: '🧥', tone: '#1f2a44', isNew: true, rating: 4.9, reviews: 51,
    description: 'Wool-blend varsity jacket with faux-leather sleeves and chenille T patch.',
    details: ['Wool-blend body, PU sleeves', 'Quilted lining', 'Snap front'],
    care: 'Dry clean only.' }),

  // ---------- KNITWEAR ----------
  p('chunky-cardigan', 'Chunky Knit Cardigan', 'knitwear', 'Cardigans', 45000, {
    colors: [C.cream, C.brown, C.grey], sizes: APPAREL, emoji: '🧶', tone: '#e9e1cf', isNew: true, rating: 4.8, reviews: 88,
    description: 'A heavy cable-knit cardigan with horn-effect buttons. Layer it over a tee.',
    details: ['Cotton-wool blend', 'Relaxed fit', 'Two patch pockets'],
    care: 'Hand wash cold. Dry flat.' }),
  p('v-neck-cardigan', 'Fine-Knit V-Neck Cardigan', 'knitwear', 'Cardigans', 39000, {
    colors: [C.navy, C.burgundy, C.black], sizes: APPAREL, emoji: '🧶', tone: '#6b2232',
    description: 'A light, fine-gauge cardigan that works over shirts or on its own.',
    details: ['Merino-blend yarn', 'Regular fit', 'Five-button front'],
    care: 'Hand wash cold. Dry flat.' }),
  p('crewneck-sweater', 'Ribbed Crewneck Sweater', 'knitwear', 'Sweaters', 35000, {
    compareAt: 42000, colors: [C.grey, C.olive, C.cream], sizes: APPAREL, emoji: '🧶', tone: '#5d6b3a',
    description: 'Mid-weight ribbed sweater with a clean crew neck.',
    details: ['100% cotton', 'Regular fit', 'Ribbed throughout'],
    care: 'Machine wash cold on wool cycle. Dry flat.' }),
  p('knit-polo', 'Knit Polo Shirt', 'knitwear', 'Polos', 29000, {
    colors: [C.black, C.cream], sizes: APPAREL, emoji: '👕', tone: '#1b1b1f', rating: 4.7, reviews: 57,
    description: 'A textured knit polo with an open collar, smart enough for dinner.',
    details: ['Cotton-viscose knit', 'Slim fit', 'Three-button placket'],
    care: 'Hand wash cold.' }),

  // ---------- SHOES ----------
  p('low-top-sneakers', 'Classic Low-Top Sneakers', 'shoes', 'Sneakers', 55000, {
    colors: [C.white, C.black], sizes: SHOES, emoji: '👟', tone: '#e9e6df', rating: 4.8, reviews: 301,
    description: 'Clean leather court sneakers with a cushioned insole. Goes with everything.',
    details: ['Full-grain leather upper', 'Rubber cupsole', 'True to size'],
    care: 'Wipe with a damp cloth. Air dry away from sun.' }),
  p('retro-runners', 'Retro Runner Sneakers', 'shoes', 'Sneakers', 62000, {
    compareAt: 75000, colors: [C.grey, C.sand], sizes: SHOES, emoji: '👟', tone: '#9a9aa0', isNew: true, rating: 4.7, reviews: 76,
    description: '70s-inspired runners in suede and mesh with a grippy wave sole.',
    details: ['Suede and mesh upper', 'EVA midsole', 'Runs slightly small: size up if between sizes'],
    care: 'Brush suede when dry. Spot clean mesh.' }),
  p('leather-cobblers', 'Handmade Leather Cobblers', 'shoes', 'Cobblers', 48000, {
    colors: [C.brown, C.black], sizes: SHOES, emoji: '👞', tone: '#6b4a2f', rating: 4.8, reviews: 112,
    description: 'Hand-stitched leather slip-on shoes made by cobblers in Aba.',
    details: ['Polished full-grain leather', 'Leather lining', 'Rubber heel tip'],
    care: 'Polish monthly. Use shoe trees.' }),
  p('suede-cobblers', 'Suede Penny Cobblers', 'shoes', 'Cobblers', 52000, {
    colors: [C.sand, C.brown], sizes: SHOES, emoji: '👞', tone: '#cdb894', isNew: true,
    description: 'Soft suede penny loafers for smart-casual days.',
    details: ['Suede upper', 'Cushioned footbed', 'True to size'],
    care: 'Brush and use suede protector spray.' }),
  p('strap-sandals', 'Leather Strap Sandals', 'shoes', 'Sandals', 28000, {
    colors: [C.brown, C.black], sizes: SHOES, emoji: '👡', tone: '#6b4a2f',
    description: 'Two-strap leather sandals with an adjustable buckle and moulded footbed.',
    details: ['Leather straps', 'Cork footbed', 'Rubber outsole'],
    care: 'Wipe clean. Keep out of long rain.' }),
  p('slide-slippers', 'Cushion Slide Slippers', 'shoes', 'Slippers', 15000, {
    colors: [C.black, C.cream], sizes: SHOES, emoji: '🩴', tone: '#1b1b1f', rating: 4.5, reviews: 190,
    description: 'Pillow-soft one-piece slides for home, pool and quick runs out.',
    details: ['Single-piece EVA', 'Textured footbed', 'Size up if between sizes'],
    care: 'Rinse with water.' }),
  p('leather-palms', 'Leather Palms', 'shoes', 'Palms', 22000, {
    colors: [C.brown, C.black, C.burgundy], sizes: SHOES, emoji: '🩴', tone: '#6b2232', isNew: true, rating: 4.9, reviews: 143,
    description: 'Classic Nigerian palm slippers in hand-cut leather with a stitched sole.',
    details: ['Full-grain leather', 'Stitched leather sole with rubber grip', 'True to size'],
    care: 'Wipe clean. Condition the leather monthly.' }),
  p('woven-palms', 'Woven Leather Palms', 'shoes', 'Palms', 25000, {
    compareAt: 30000, colors: [C.sand, C.brown], sizes: SHOES, emoji: '🩴', tone: '#cdb894',
    description: 'Palms with a hand-woven leather strap for a textured finish.',
    details: ['Woven leather strap', 'Padded footbed', 'True to size'],
    care: 'Wipe clean. Avoid soaking.' }),

  // ---------- BAGS ----------
  p('rolltop-backpack', 'Canvas Roll-Top Backpack', 'bags', 'Backpacks', 42000, {
    colors: [C.black, C.olive], sizes: ONE, emoji: '🎒', tone: '#4a5240', rating: 4.7, reviews: 98,
    description: 'Water-resistant roll-top backpack with a padded 16-inch laptop sleeve.',
    details: ['Waxed canvas', '24 litres', 'Padded straps and back panel'],
    care: 'Spot clean.' }),
  p('crossbody-bag', 'Mini Crossbody Bag', 'bags', 'Crossbody', 24000, {
    colors: [C.black, C.brown, C.cream], sizes: ONE, emoji: '👜', tone: '#1b1b1f', isNew: true,
    description: 'Compact crossbody for phone, wallet and keys, worn on the chest or hip.',
    details: ['Nylon with leather trim', 'Adjustable strap', '22 × 15 × 6 cm'],
    care: 'Spot clean.' }),
  p('canvas-tote', 'Heavy Canvas Tote', 'bags', 'Totes', 16000, {
    colors: [C.cream, C.black], sizes: ONE, emoji: '👜', tone: '#e9e1cf', rating: 4.6, reviews: 154,
    description: 'A sturdy everyday tote with an inside zip pocket and printed logo.',
    details: ['16oz cotton canvas', 'Inside zip pocket', '40 × 38 × 12 cm'],
    care: 'Spot clean or cold hand wash.' }),
  p('weekender-duffel', 'Weekender Duffel', 'bags', 'Duffels', 65000, {
    colors: [C.black, C.brown], sizes: ONE, emoji: '🧳', tone: '#6b4a2f',
    description: 'A carry-on duffel with a separate shoe compartment.',
    details: ['Canvas with leather handles', '40 litres', 'Detachable shoulder strap'],
    care: 'Spot clean. Condition leather handles.' }),

  // ---------- CAPS ----------
  p('logo-cap', 'Embroidered Logo Cap', 'caps', 'Caps', 14000, {
    colors: [C.black, C.navy, C.cream], sizes: ONE, emoji: '🧢', tone: '#1f2a44', rating: 4.8, reviews: 207,
    description: 'Six-panel baseball cap with a raised TEE embroidery and adjustable strap.',
    details: ['Cotton twill', 'Adjustable back strap', 'Pre-curved brim'],
    care: 'Hand wash cold. Reshape and air dry.' }),
  p('dad-cap', 'Washed Dad Cap', 'caps', 'Caps', 12000, {
    compareAt: 15000, colors: [C.sand, C.olive, C.navy], sizes: ONE, emoji: '🧢', tone: '#cdb894',
    description: 'Soft unstructured cap with a faded garment-washed finish.',
    details: ['Washed cotton', 'Metal buckle strap', 'Low profile'],
    care: 'Hand wash cold.' }),
  p('bucket-hat', 'Twill Bucket Hat', 'caps', 'Bucket hats', 15000, {
    colors: [C.black, C.cream, C.olive], sizes: CAPS, emoji: '👒', tone: '#5d6b3a', isNew: true,
    description: 'A structured bucket hat with a short brim and embroidered side logo.',
    details: ['Cotton twill', 'S/M fits 56–58cm, L/XL fits 59–61cm', 'Inner sweatband'],
    care: 'Hand wash cold.' }),
  p('rib-beanie', 'Rib Knit Beanie', 'caps', 'Beanies', 10000, {
    colors: [C.black, C.grey, C.burgundy], sizes: ONE, emoji: '🧶', tone: '#5a2a34',
    description: 'A soft rib beanie with a fold-over cuff and woven label.',
    details: ['Acrylic-wool blend', 'One size, stretch fit', 'Fold-over cuff'],
    care: 'Hand wash cold. Dry flat.' }),
];

export const CATEGORIES = ['All', ...new Set(PRODUCTS.map((x) => x.category))];
export const ALL_COLORS = Object.values(C);
export const ALL_SIZES = [...APPAREL, ...CAPS, ...ONE, ...SHOES];
export const MAX_PRICE = Math.max(...PRODUCTS.map((x) => x.price));

export const getProduct = (id) => PRODUCTS.find((x) => x.id === id);
export const variantKey = (size, color) => `${size}|${color}`;

// Stock for one variant: a real number if product.stock has it,
// otherwise a steady number generated from the variant's name (0 to 11).
export function getStock(product, size, color) {
  const key = variantKey(size, color);
  if (product.stock && key in product.stock) return product.stock[key];
  let hash = 0;
  for (const ch of product.id + key) hash = (hash * 31 + ch.charCodeAt(0)) % 9973;
  const n = hash % 12;
  return n === 0 ? 0 : n; // about 1 in 12 variants sold out, some with 1–3 left
}

export const totalStock = (x) =>
  x.sizes.reduce((sum, s) => sum + x.colors.reduce((t, c) => t + getStock(x, s, c.name), 0), 0);

// Unisex clothing measurements in centimetres (body chest and waist)
export const SIZE_GUIDE = [
  { size: 'S', chest: '91–96', waist: '76–81', ukus: '36–38' },
  { size: 'M', chest: '97–102', waist: '82–87', ukus: '38–40' },
  { size: 'L', chest: '103–108', waist: '88–93', ukus: '40–42' },
  { size: 'XL', chest: '109–114', waist: '94–99', ukus: '42–44' },
  { size: 'XXL', chest: '115–120', waist: '100–105', ukus: '44–46' },
  { size: 'XXXL', chest: '121–126', waist: '106–111', ukus: '46–48' },
];

// Shoe size conversion (approximate; brands vary by half a size)
export const SHOE_SIZE_GUIDE = [
  { eu: '39', uk: '6', us: '7', cm: '24.5' },
  { eu: '40', uk: '6.5', us: '7.5', cm: '25' },
  { eu: '41', uk: '7.5', us: '8.5', cm: '26' },
  { eu: '42', uk: '8', us: '9', cm: '26.5' },
  { eu: '43', uk: '9', us: '10', cm: '27.5' },
  { eu: '44', uk: '9.5', us: '10.5', cm: '28' },
  { eu: '45', uk: '10.5', us: '11.5', cm: '29' },
  { eu: '46', uk: '11', us: '12', cm: '29.5' },
];

export const DISCOUNT_CODES = {
  WELCOME10: { type: 'percent', value: 10, label: '10% off your first order' },
  TEE5000: { type: 'fixed', value: 5000, label: '₦5,000 off' },
};

// Shipping costs are in NGN like everything else
export const SHIPPING = {
  freeFrom: 150000,
  options: [
    { id: 'standard-ng', label: 'Standard (Nigeria)', eta: '3–5 working days', price: 3500, region: 'NG' },
    { id: 'express-ng', label: 'Express (Nigeria)', eta: '1–2 working days', price: 7500, region: 'NG' },
    { id: 'intl', label: 'International (DHL)', eta: '5–9 working days', price: 45000, region: 'INTL' },
  ],
};
