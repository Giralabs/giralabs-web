// Store links for the two Bipsy apps. iOS is live; Android ships in a few weeks,
// so its links stay empty until then and the UI shows "coming soon" instead.
export const BIPSY_STORE = {
  client: {
    appStore: 'https://apps.apple.com/es/app/bipsy/id6828380156',
    googlePlay: '',
  },
  business: {
    appStore: 'https://apps.apple.com/es/app/bipsy-business/id6828380398',
    googlePlay: '',
  },
} as const;

// The two websites: booking from the browser, and the Bipsy Business site
export const BIPSY_WEB = {
  client: 'https://bipsy.es',
  business: 'https://business.bipsy.es',
} as const;
