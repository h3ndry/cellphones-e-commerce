import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

:root {
  --black: #000;
  --dark: #323232;
  --red: #fd5151;
  --grey: #F5F5F5;
  --blue: #007fff;
  --white: #FFFFFF;

  --display-font: Calibri /*'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, */
}

html {
  font-size: 100%;
  @media screen and (max-width: 32em) {
    font-size: 80%;
  }
}

*,
*::before,
*::after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--display-font);
  background-color: var(--grey);
  padding-bottom: 2rem;
}
`