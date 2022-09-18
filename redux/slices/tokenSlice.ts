import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Token } from '../../types/frontend'


const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    user: null as string | null,
    refreshToken: null as Token
  },
  reducers: {
    setUser: (s, a: PayloadAction<string | null>) => {
      s.user = a.payload
    },
    setRefreshToken: (s, a: PayloadAction<Token>) => {
      s.refreshToken = a.payload
    },
  }
})

export const tokenActions = tokenSlice.actions

export const tokenReducer = tokenSlice.reducer

