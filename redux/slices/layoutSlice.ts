import { createSlice } from '@reduxjs/toolkit'


const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    menuAccountExpanded: false,
    menuThemeExpanded: false,
    menuSettingsExpanded: false,
    menuAboutExpanded: false
  },
  reducers: {
    toggleMenuAccountExpanded: s => {
      s.menuAccountExpanded = !s.menuAccountExpanded
    },
    toggleMenuThemeExpanded: s => {
      s.menuThemeExpanded = !s.menuThemeExpanded
    },
    toggleMenuSettingsExpanded: s => {
      s.menuSettingsExpanded = !s.menuSettingsExpanded
    },
    toggleMenuAboutExpanded: s => {
      s.menuAboutExpanded = !s.menuAboutExpanded
    }
  }
})

export const layoutActions = layoutSlice.actions

export const layoutReducer = layoutSlice.reducer

