import {
  AppBar, Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { tokenActions } from '../../redux/slices/tokenSlice'


function MenuBar() {
  const dispatch = useDispatch()
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const user = useSelector((s: RootState) => s.token.user)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    })
    dispatch(tokenActions.setRefreshToken(null))
    dispatch(tokenActions.setUser(null))
  }

  return (
    <AppBar position={isMobile ? "fixed" : "static"}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
        >
          <Link href='/'>{user ? user : 'TODOs'}</Link>
        </Typography>
        {refreshToken ?
          <Button color="inherit" onClick={handleLogout}>
            <Link href='/'>Logout</Link>
          </Button>
          : <Button color="inherit" >
            <Link href='/login'>Login</Link>
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar

