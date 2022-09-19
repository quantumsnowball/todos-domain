import { createSlice } from '@reduxjs/toolkit'


const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    menuThemeExpanded: false,
    menuSettingsExpanded: false,
    menuAboutExpanded: false
  },
  reducers: {
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

