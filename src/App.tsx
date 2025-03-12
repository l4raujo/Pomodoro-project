import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

import { Router } from './Router'
import { CyclesContextProvide } from './contexts/CyclesContext'



export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvide>
          <Router />
        </CyclesContextProvide>
      </BrowserRouter>
        <GlobalStyle />
    </ThemeProvider>
  )
}
