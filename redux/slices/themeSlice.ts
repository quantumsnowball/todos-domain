import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColorMode, ThemeName } from '../../types'


const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    name: 'elementary' as ThemeName,
    mode: 'dark' as ColorMode
  },
  reducers: {
    toggleMode: s => {
      s.mode = s.mode === 'light' ? 'dark' : 'light'
    },
    setTheme: (s, a: PayloadAction<ThemeName>) => {
      s.name = a.payload
    }
  }
})

export const themeActions = themeSlice.actions

export const themeReducer = themeSlice.reducer
