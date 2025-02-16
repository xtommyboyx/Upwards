export const ITUNES_API = {
  BASE_URL: 'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
  IMAGE_SIZES: {
    SMALL: '55x55bb.png',
    MEDIUM: '60x60bb.png',
    LARGE: '170x170bb.png'
  }
};

export const DEFAULTS = {
  UNKNOWN_ALBUM: 'Unknown Album',
  UNKNOWN_ARTIST: 'Unknown Artist',
  FALLBACK_LINK: '#'
};

export const BREAKPOINTS = {
  COMPACT_MOBILE: 375,
  MOBILE: 414,
  LARGER_MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1200
};

export const GRID = {
  COLUMNS: {
    COMPACT_MOBILE: 2,
    MOBILE: 2,
    LARGER_MOBILE: 3,
    TABLET: 4,
    DESKTOP: 6
  },
  ROWS: {
    COMPACT_MOBILE: 3,
    MOBILE: 5,
    LARGER_MOBILE: 3,
    TABLET: 3,
    DESKTOP: 2
  }
};