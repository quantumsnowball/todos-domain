import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token } from '../../types/frontend'


const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    // refreshToken: null as Token,
    refreshToken: 'token1234' as Token,
  },
  reducers: {
    setRefreshToken: (s, a: PayloadAction<Token>) => {
      s.refreshToken = a.payload
    },
  }
})

export const tokenActions = tokenSlice.actions

export const tokenReducer = tokenSlice.reducer
