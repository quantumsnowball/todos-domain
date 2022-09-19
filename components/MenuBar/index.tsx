import {
  AppBar, Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useTheme } from '@mui/material'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import MenuDrawer from '../MenuDrawer'
import { useState } from 'react'
import { themeActions } from '../../redux/slices/themeSlice'


function MenuBar() {
  const dispatch = useDispatch()
  const user = useSelector((s: RootState) => s.token.user)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <AppBar position={isMobile ? "fixed" : "static"}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant={isMobile ? "subtitle2" : "subtitle1"}
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            <Link href='/'>{user ? user : 'TODOs'}</Link>
          </Typography>
          <IconButton onClick={() => dispatch(themeActions.toggleMode())}>
            {theme.palette.mode === 'light' ?
              <LightModeIcon sx={{ color: '#fff' }} /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <MenuDrawer {...{ menuOpen, setMenuOpen }} />
    </>
  )
}

export default MenuBar

