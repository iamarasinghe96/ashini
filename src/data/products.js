// Tutorial catalogue.
//
// Each product is one purchasable tutorial.
//   video    : path to a 3s looping preview mp4 (drop files in /public/videos).
//              Leave empty to show a pretty gradient placeholder.
//   youtubeId: the full tutorial video, only revealed AFTER purchase.
//
// For now every tutorial points to the same demo YouTube video.
const DEMO_YOUTUBE_ID = '_sNOp8XRmaM'

export const products = [
  {
    id: 'sugar-peony',
    title: 'Sugar Peony Topper',
    blurb: 'A lifelike layered sugar peony with soft blush petals.',
    price: 7.99,
    accent: '#F6CEDD',
    emoji: '🌸',
    video: '/videos/sugar-peony.mp4',
    youtubeId: DEMO_YOUTUBE_ID,
  },
  {
    id: 'gold-monogram',
    title: 'Gold Leaf Monogram',
    blurb: 'Elegant gold-leaf initials that sit perfectly on tiered cakes.',
    price: 5.99,
    accent: '#E4CFA3',
    emoji: '✨',
    video: '/videos/gold-monogram.mp4',
    youtubeId: DEMO_YOUTUBE_ID,
  },
  {
    id: 'fondant-bunny',
    title: 'Fondant Bunny Figure',
    blurb: 'An adorable seated fondant bunny — perfect for baby showers.',
    price: 8.99,
    accent: '#F6CEDD',
    emoji: '🐰',
    video: '/videos/fondant-bunny.mp4',
    youtubeId: DEMO_YOUTUBE_ID,
  },
  {
    id: 'ruffle-rose',
    title: 'Ruffle Rose Cascade',
    blurb: 'A romantic cascade of ruffled roses in champagne tones.',
    price: 9.99,
    accent: '#E79DBE',
    emoji: '🌹',
    video: '/videos/ruffle-rose.mp4',
    youtubeId: DEMO_YOUTUBE_ID,
  },
  {
    id: 'pearl-crown',
    title: 'Pearl & Crown Topper',
    blurb: 'A dainty edible-pearl crown fit for a first-birthday cake.',
    price: 6.99,
    accent: '#E4CFA3',
    emoji: '👑',
    video: '/videos/pearl-crown.mp4',
    youtubeId: DEMO_YOUTUBE_ID,
  },
  {
    id: 'butterfly-set',
    title: 'Wafer Butterfly Set',
    blurb: 'Hand-painted wafer-paper butterflies that look ready to fly.',
    price: 7.49,
    accent: '#F6CEDD',
    emoji: '🦋',
    video: '/videos/butterfly-set.mp4',
    youtubeId: DEMO_YOUTUBE_ID,
  },
]

export const productById = (id) => products.find((p) => p.id === id)
