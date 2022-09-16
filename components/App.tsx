import { createTheme, styled, ThemeProvider } from '@mui/material'
import { CustomFC } from '../types/frontend'
import MenuBar from './MenuBar'
import Main from './Main'
import { CenterContent } from './styled/containers'
import { useCallback } from 'react'
import chooseTheme from '../styles/theme'


const defaultTheme = createTheme()

const FlexColumnDiv = styled(CenterContent('div'))`
  /* cover full viewport */
  height: 100vh;
  max-height: 100vh;
  justify-content: space-between;
  /* theme */
  color: ${props => props.theme.palette.text.primary};
  background-color: ${props => props.theme.palette.background.default};
`

const App: CustomFC = ({ children }) => {
  const mode = 'light'
  const name = 'elementary'
  const theme = useCallback(() => createTheme(chooseTheme(name)(mode)), [name, mode])

  return (
    <ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={theme}>
        <FlexColumnDiv id="app-ctn">
          <MenuBar />
          <Main> {children} </Main>
        </FlexColumnDiv>
      </ThemeProvider>
    </ThemeProvider>
  )
}

export default App
