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


function MenuBar() {
  const refreshToken = null
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
          <Link href='/'>TODOs</Link>
        </Typography>
        {refreshToken ?
          <Button color="inherit" >
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

