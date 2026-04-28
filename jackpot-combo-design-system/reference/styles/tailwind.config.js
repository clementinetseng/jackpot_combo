/**
 * Shared Tailwind config — consumed by both apps/backoffice and apps/player.
 *
 * Usage in HTML (via Tailwind Play CDN):
 *   <script>tailwind.config = require('./tailwind.config.js')</script>
 *
 * For production build, export this config to both app's build pipeline.
 * Tokens align with design-system/tokens/*.json (single source of truth).
 */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Player theme (frontend)
        brand: {
          purple:  '#8E66FF',
          purple2: '#B185FF',
          blue:    '#6FB1FC',
          deep:    '#5B46A6',
        },
        accent: {
          yellow: '#FFC107',
        },
        lavender: {
          50:  '#F4EFFA',
          100: '#E8E0F5',
          200: '#D9CBE9',
          300: '#C8B8E5',
          400: '#A89ACC',
          500: '#8E7DC0',
          600: '#6B5B8E',
          700: '#4A3B7A',
        },
        ink: {
          DEFAULT: '#2D1B4E',
          muted:   '#6B5B8E',
          soft:    '#8E7DC0',
        },
        softborder: '#E5DCF5',

        // Backoffice theme
        office: {
          primary:      '#2563EB',
          primaryHover: '#1D4ED8',
          primaryLight: '#EFF3FF',
          primaryText:  '#1E40AF',
        },
      },
      backgroundImage: {
        'page-gradient':    'linear-gradient(140deg, #EBE3F7 0%, #D5C5EA 60%, #BFA8E1 100%)',
        'banner-gradient':  'linear-gradient(90deg, #6FB1FC 0%, #8E66FF 60%, #B185FF 100%)',
        'primary-pill':     'linear-gradient(90deg, #8E66FF 0%, #B185FF 100%)',
        'primary-cta':      'linear-gradient(90deg, #6FB1FC 0%, #8E66FF 100%)',
      },
      borderRadius: {
        pill: '9999px',
      },
      boxShadow: {
        card:      '0 4px 20px -6px rgba(139,102,255,0.15)',
        cardHover: '0 10px 30px -8px rgba(139,102,255,0.25)',
        pill:      '0 2px 8px -2px rgba(139,102,255,0.4)',
      },
    },
  },
};
