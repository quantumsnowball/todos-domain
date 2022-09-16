import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TodoWithId } from '../../types'


const contentSlice = createSlice({
  name: 'content',
  initialState: {
    // todos: [] as TodoWithId[],
    todos: [{
      title: 'Title',
      content: 'Content',
      _id: '99998',
    }] as TodoWithId[],
  },
  reducers: {
    setTodos: (s, a: PayloadAction<TodoWithId[]>) => {
      s.todos = a.payload
    },
  }
})

export const contentActions = contentSlice.actions

export const contentReducer = contentSlice.reducer

