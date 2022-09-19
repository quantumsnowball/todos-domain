import { List, Collapse } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { layoutActions } from '../../redux/slices/layoutSlice'
import { MenuButtonGrouper, MenuButton } from './common'
import { useRouter } from 'next/router'
import { sessionActions } from '../../redux/slices/sessionSlice'


function AccountMenu() {
  const menuAccountExpanded = useSelector((s: RootState) => s.layout.menuAccountExpanded)
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    })
    dispatch(sessionActions.setRefreshToken(null))
    dispatch(sessionActions.setUser(null))
  }

  return (
    <>
      <MenuButtonGrouper
        icon={<AccountBoxIcon />}
        text="Account"
        open={menuAccountExpanded}
        toggle={() => dispatch(layoutActions.toggleMenuAccountExpanded())}
      />
      <Collapse in={menuAccountExpanded} timeout="auto" unmountOnExit>
        <List>
          {refreshToken ?
            <MenuButton
              icon={<LogoutIcon />}
              text="Logout"
              onClick={handleLogout}
              level={1}
            /> :
            <MenuButton
              icon={<LoginIcon />}
              text="Login"
              onClick={() => router.push('/login')}
              level={1}
            />
          }
        </List>
      </Collapse>
    </>
  )
}

export default AccountMenu

