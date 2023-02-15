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
  whiteGrey: '#F1F0EA',
  whiteBlue: '#E5EEFF',   // hover white
  black: '#000000',
}

const palette = {
  bg: BG_COLOR,
  text: TEXT_COLOR,
  buttonbg: BG_BUTTON_COLOR,
  gradient: {
    bgblue: `linear-gradient(0deg, ${BG_COLOR.lightBlue} 0%, ${BG_COLOR.darkBlue} 100%)` //blue bg
  },
}

export default palette