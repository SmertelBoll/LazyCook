const MAXWIDTH = 1920
const MINWIDTH = 320


const largeFormula = (minSize, maxSize) => {
  return `calc(${minSize}px + ${maxSize-minSize} * (100vw / ${MAXWIDTH}))`
}
const smallFormula = (minSize, maxSize) => {
  return `calc(${minSize}px + (${maxSize-minSize} + ${maxSize-minSize} * 0.7) * ((100vw - ${MINWIDTH}px) / ${MAXWIDTH}))`
}

const typography = {
  fontFamily: "'Kanit', sans-serif",
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontSize: smallFormula(48, 96),
    '@media (min-width:767px)': {
      fontSize: largeFormula(48, 96),
    },
    fontWeight: 600,
  },
  h2: {
    fontSize: smallFormula(40, 80),
    '@media (min-width:767px)': {
      fontSize: largeFormula(40, 80),
    },
    fontWeight: 600,
  },
  h3: {                                  // header button, ingredient text
    fontSize: smallFormula(16, 28),
    '@media (min-width:767px)': {
      fontSize: largeFormula(16, 28),
    },
    fontWeight: 400,
    textTransform: "unset",
  },
  p: {
    fontSize: smallFormula(16, 32),
    '@media (min-width:767px)': {
      fontSize: largeFormula(16, 32),
    },
    fontWeight: 400,
    textTransform: "unset",
  },
  logo: {
    fontSize: smallFormula(24, 44),
    '@media (min-width:767px)': {
      fontSize: largeFormula(24, 44),
    },
    fontWeight: 700,
  },
  navDrawer: {
    fontSize: "28px",
    fontWeight: 400,
  },
}

export default typography;

