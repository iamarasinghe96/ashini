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
