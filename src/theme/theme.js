import { createTheme } from "@mui/material/styles";
import palette from './palette.js'
import spacing from './spacing.js'
import typography from './typography.js'

export const theme = createTheme({
  palette,
  spacing,
  typography,
  shadows: [...createTheme({}).shadows.map((shadow, i) => (
    i === 0 ? '0px 5px 19px rgba(0, 0, 0, 0.25)' :      // header
    i === 1 ? '0px -1px 28px rgba(0, 0, 0, 0.25)' :     // footer
    i === 2 ? '13px 15px 38px rgba(0, 0, 0, 0.25)' :    // form, button
    i === 3 ? '13px 15px 28px rgba(0, 0, 0, 0.25)' :    // authForm
    shadow
  ))],
})