// Central place for owner-editable site content. Edit these values to rebrand.

export const site = {
  name: 'Sweet Toppers',
  tagline: 'Cake topper tutorials, made simple.',
  description:
    'Sweet Toppers is a little studio of bite-size video tutorials that teach you how to craft show-stopping, hand-made cake toppers — from delicate sugar flowers to fondant figures and gold-leaf monograms. Buy just the tutorial you need, or subscribe and unlock the whole library.',

  // Subscription plan (unlocks every tutorial).
  subscription: {
    price: 19.99,
    period: 'month',
    perks: [
      'Unlimited access to every tutorial',
      'New tutorials added monthly',
      'Downloadable templates & supply lists',
      'Cancel anytime',
    ],
  },

  // In-person / live class offering. Participants get a hands-on session PLUS
  // access to a selected set of tutorials (chosen by the admin later).
  classOffering: {
    eyebrow: 'Hands-on learning',
    title: 'Join a Sweet Toppers Class',
    intro:
      'Want more than watching? In our classes you get to actually make your own cake toppers — guided step by step, in real time, with all the little tricks that are hard to pick up from a screen alone.',
    // The big differences vs. just watching the videos.
    benefits: [
      {
        icon: '✂️',
        title: 'Make your own cutout templates',
        text: 'Learn to design and cut the templates yourself — the foundation of every clean, professional topper.',
      },
      {
        icon: '🙌',
        title: 'Hands-on, guided practice',
        text: 'Work along with the instructor and shape your topper with help at every step, not just by watching.',
      },
      {
        icon: '💬',
        title: 'Live feedback & questions',
        text: 'Ask anything in the moment and get instant tips to fix mistakes before they set.',
      },
      {
        icon: '🎁',
        title: 'Take-home materials',
        text: 'Leave with the templates and supplies you used, ready to recreate the topper at home.',
      },
      {
        icon: '🔓',
        title: 'Bonus tutorial access',
        text: 'Class participants unlock a hand-picked selection of online tutorials to keep practising after class.',
      },
      {
        icon: '🤝',
        title: 'Learn in a small group',
        text: 'Intimate, friendly sessions so everyone gets attention and plenty of one-on-one time.',
      },
    ],
    // Set to a number (e.g. 89) to show a price, or leave null to say "Enquire".
    price: null,
    ctaLabel: 'Enquire about classes',
  },

  contact: {
    email: 'hello@sweettoppers.example',
    phone: '+1 (555) 012-3456',
    whatsapp: '+15550123456',
    socials: {
      facebook: 'https://facebook.com/sweettoppers',
      instagram: 'https://instagram.com/sweettoppers',
      tiktok: 'https://tiktok.com/@sweettoppers',
    },
  },

  services: [
    {
      icon: '🎀',
      title: 'Step-by-step video tutorials',
      text: 'Short, looping, easy-to-follow videos that walk you through each topper from start to finish.',
    },
    {
      icon: '📐',
      title: 'Templates & supply lists',
      text: 'Every tutorial comes with the exact templates and a shopping list so you can prep with confidence.',
    },
    {
      icon: '🎂',
      title: 'Custom topper requests',
      text: 'Need a topper for a specific theme or event? Send us your idea and we will film a tutorial for it.',
    },
    {
      icon: '💬',
      title: 'Friendly support',
      text: 'Stuck halfway through a flower? Message us and we will help you get unstuck.',
    },
  ],
}
