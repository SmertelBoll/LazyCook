function createGradient(color1, color2, direction = 'bottom') {
  return `linear-gradient(to ${direction}, ${color1}, ${color2})`;
}

const BG_COLOR = {
  main: '#FDFDFD',       // white
  blue: '#E5EEFF',
  grey: '#F1F0EA',
  lightBlue: '#E1EBFF',
  darkBlue: '#F6FAFD',
}

const TEXT_COLOR = {
  black: '#000000',
  grey: '#6C6E8A',
  white: '#FDFDFD',
}

const BG_BUTTON_COLOR = {
  grey: '#CBCCE0',        // header nav
  white: '#FDFDFD',
  whiteBlue: '#E5EEFF',   // hover white
  dark: '#000000',
}

const palette = {
  bg: BG_COLOR,
  text: TEXT_COLOR,
  buttonbg: BG_BUTTON_COLOR,
  gradients: {
    bgblue: createGradient(BG_COLOR.lightBlue, BG_COLOR.darkBlue, 'top') //blue bg
  },
}

export default palette