import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  persistReducer, persistStore,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { sessionReducer } from './slices/sessionSlice'
import { contentReducer } from './slices/contentSlice'
import { themeReducer } from './slices/themeSlice'
import { layoutReducer } from './slices/layoutSlice'


// reducers
const rootReducer = combineReducers({
  token: sessionReducer,
  content: contentReducer,
  theme: themeReducer,
  layout: layoutReducer
})

// store
export const store = configureStore({
  reducer: persistReducer({ key: 'root', storage, blacklist: ['content'] }, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
})

// persistor
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

