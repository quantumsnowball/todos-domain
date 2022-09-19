import { List, Collapse } from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SurfingIcon from '@mui/icons-material/Surfing'
import ForestIcon from '@mui/icons-material/Forest'
import SpaIcon from '@mui/icons-material/Spa'
import WbTwilightIcon from '@mui/icons-material/WbTwilight'
import WavesIcon from '@mui/icons-material/Waves'
import { useDispatch } from 'react-redux'
import { layoutActions } from '../../redux/slices/layoutSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { themeActions } from '../../redux/slices/themeSlice'
import { MenuButton, MenuButtonGrouper } from './common'


function ThemeMenu() {
  const menuThemeExpanded = useSelector((s: RootState) => s.layout.menuThemeExpanded)
  const dispatch = useDispatch()

  return (
    <>
      <MenuButtonGrouper
        icon={<ColorLensIcon />}
        text="Theme"
        open={menuThemeExpanded}
        toggle={() => dispatch(layoutActions.toggleMenuThemeExpanded())}
      />
      <Collapse in={menuThemeExpanded} timeout="auto" unmountOnExit>
        <List>
          <MenuButton
            icon={<AutoAwesomeIcon />}
            text='Elementary'
            onClick={() => dispatch(themeActions.setTheme('elementary'))}
            level={1}
          />
          <MenuButton
            icon={<SurfingIcon />}
            text='Beach'
            onClick={() => dispatch(themeActions.setTheme('beach'))}
            level={1}
          />
          <MenuButton
            icon={<ForestIcon />}
            text='Forest'
            onClick={() => dispatch(themeActions.setTheme('forest'))}
            level={1}
          />
          <MenuButton
            icon={<SpaIcon />}
            text='Rose'
            onClick={() => dispatch(themeActions.setTheme('rose'))}
            level={1}
          />
          <MenuButton
            icon={<WbTwilightIcon />}
            text='Sunset'
            onClick={() => dispatch(themeActions.setTheme('sunset'))}
            level={1}
          />
          <MenuButton
            icon={<WavesIcon />}
            text='Ocean'
            onClick={() => dispatch(themeActions.setTheme('ocean'))}
            level={1}
          />
        </List>
      </Collapse>
    </>
  )
}

export default ThemeMenu
