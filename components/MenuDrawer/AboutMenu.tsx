import { List, Collapse } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import InfoIcon from '@mui/icons-material/Info'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { layoutActions } from '../../redux/slices/layoutSlice'
import { MenuLabel, MenuButtonGrouper } from './common'


function AboutMenu() {
  const menuAboutExpanded = useSelector((s: RootState) => s.layout.menuAboutExpanded)
  const dispatch = useDispatch()

  return (
    <>
      <MenuButtonGrouper
        icon={<HelpOutlineIcon />}
        text="About Todos"
        open={menuAboutExpanded}
        toggle={() => dispatch(layoutActions.toggleMenuAboutExpanded())}
      />
      <Collapse in={menuAboutExpanded} timeout="auto" unmountOnExit>
        <List>
          { /* <MenuLabel
              icon={<InfoIcon />}
              label={`version ${process.env.REACT_APP_VERSION}`}
              level={1}
              primaryTypographyProps={{ variant: 'caption' }}
            /> */ }
          <MenuLabel
            icon={<InfoIcon />}
            label={`@2022\nQuantum Snowball`}
            level={1}
            primaryTypographyProps={{ variant: 'caption' }}
          />
        </List>
      </Collapse>
    </>
  )
}

export default AboutMenu

