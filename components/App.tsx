import { store, persistor, RootState } from '../redux/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
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
  position: fixed;
  height: 100%;
  width: 100%;
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

const ThemeWrapper: CustomFC = ({ children }) => {
  const mode = useSelector((s: RootState) => s.theme.mode)
  const name = useSelector((s: RootState) => s.theme.name)
  const theme = useCallback(() => createTheme(chooseTheme(name)(mode)), [name, mode])

  useEffect(() => {
    document.body.style.backgroundColor = theme().palette.background.default
  }, [theme])

  return (
    <ThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={theme}>
        <App> {children} </App>
      </ThemeProvider>
    </ThemeProvider>
  )
}

const ReduxWrapper: CustomFC = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeWrapper> {children} </ThemeWrapper>
      </PersistGate>
    </Provider>
  )
}

export default ReduxWrapper
