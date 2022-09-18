import { store, persistor } from '../redux/store'
import { Provider, useDispatch } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createTheme, styled, ThemeProvider } from '@mui/material'
import { CustomFC } from '../types/frontend'
import MenuBar from './MenuBar'
import Main from './Main'
import { CenterContent } from './styled/containers'
import { useCallback, useEffect } from 'react'
import chooseTheme from '../styles/theme'
import { sessionActions } from '../redux/slices/sessionSlice'
import { useCookies } from 'react-cookie'
import { getJwtUser } from '../utils'


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
  const dispatch = useDispatch()

  const [cookies, _, removeCookie] = useCookies(['refreshToken', 'message'])

  // grap if there is a refresh token in cookie
  useEffect(() => {
    if (cookies.refreshToken) {
      dispatch(sessionActions.setRefreshToken(cookies.refreshToken))
      dispatch(sessionActions.setUser(getJwtUser(cookies.refreshToken)))
      removeCookie('refreshToken')
    }
  }, [])

  // display message if there is a message in cookie
  useEffect(() => {
    if (cookies.message) {
      alert(cookies.message)
      removeCookie('message')
    }
  }, [])


  return (
    <FlexColumnDiv id="app-ctn">
      <MenuBar />
      <Main> {children} </Main>
    </FlexColumnDiv>
  )
}

const AppProvider: CustomFC = ({ children }) => {
  const mode = 'light'
  const name = 'elementary'
  const theme = useCallback(() => createTheme(chooseTheme(name)(mode)), [name, mode])

  useEffect(() => {
    document.body.style.backgroundColor = theme().palette.background.default
  }, [theme])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={defaultTheme}>
          <ThemeProvider theme={theme}>
            <App> {children} </App>
          </ThemeProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default AppProvider
