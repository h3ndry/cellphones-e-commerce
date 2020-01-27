import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

:root {
  --black: #000;
  --red: #FE4747;
  --grey: #F5F5F5;
  --blue: #2F35D5;
  --white: #FFFFFF;

  --display-font: Calibri /*'Lato', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, */
}

html {
  font-size: 100%;
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
}
`