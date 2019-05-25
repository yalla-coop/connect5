// media queries
// so far we only decided to use 1 breakpoint, 768px (tablet)
export const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  mobileXL: '680px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const breakpoints = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  mobileXL: `(min-width: ${size.mobileXL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const colorCodes = {
  // primary (purple)
  primary: '#2C3192',
  lightPrimary: '#787BB9',
  extralightPrimary: '#C5C6E1',

  // positive, negative and confirm/cancel
  red: '#E97DA0',
  green: '#9FCE67',

  // general
  white: '#FFFFFF',
  offWhite: '#F7F7F9',
  gray: '#D4D4D8',
  lightGray: '#EFEFF4',
  mediumGray: '#E1E1E2',
  black: '#4F4F4F',

  // transparent
  transGray: 'rgba(212, 212, 216, 0.3)',
  transLightGray: 'rgba(239, 239, 244, 0.3)',
  backgroundWashOut: 'rgba(239, 239, 244, 0.6)',
};

// general colors
export const colors = {
  ...colorCodes,
  headingUnderline: colorCodes.lightGray,
  cardBackground: colorCodes.white,
  profileFontColor: colorCodes.black,
  links: colorCodes.primary,
};

// shadows
export const shadows = {
  primary: '0px 1px 4px rgba(0, 0, 0, 0.05)',
  secondary: '0px 3px 6px rgba(0, 0, 0, 0.07)',
};

// borders
export const borders = {
  inputBox: `1px solid ${colors.lightGray}`,
  button: `1px solid ${colors.gray}`,
  header: `1px solid ${colors.offWhite}`,
  toggle: `1px solid ${colors.black}`,
};
