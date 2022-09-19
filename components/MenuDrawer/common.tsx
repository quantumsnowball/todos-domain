import {
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'


export const MenuTitle = (
  { title }:
    { title: string }
) =>
  <List>
    <ListItem>
      <ListItemText primary={title} />
    </ListItem>
  </List>

export const MenuLabel = (
  { icon, label, level = 0, primaryTypographyProps }:
    { icon: JSX.Element, label: string, level?: number, primaryTypographyProps?: object }
) =>
  <ListItem key={label} disablePadding sx={{ paddingLeft: 2 + level * 2 }}>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText primary={label} primaryTypographyProps={primaryTypographyProps} />
  </ListItem>

export const MenuButton = (
  { icon, text, onClick, level = 0 }:
    { icon: JSX.Element, text: string, onClick?: React.MouseEventHandler<HTMLDivElement> | undefined, level?: number }
) =>
  <ListItem key={text} disablePadding>
    <ListItemButton onClick={onClick} sx={{ paddingLeft: 2 + level * 2 }}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem >

export const MenuButtonGrouper = (
  { icon, text, open, toggle }:
    { icon: JSX.Element, text: string, open: boolean, toggle: () => void }
) =>
  <ListItem key={text} disablePadding>
    <ListItemButton onClick={e => {
      e.stopPropagation()
      toggle()
    }}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  </ListItem>
