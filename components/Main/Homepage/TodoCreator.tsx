import {
  styled,
  Button,
  TextField
} from "@mui/material"
import { useRouter } from 'next/router'
import { useState } from "react"
import { Todo } from "../../../types"
import { addTodos, renewToken } from "../../../utils/frontend/fetch"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { contentActions } from "../../../redux/slices/contentSlice"


const Div = styled('div')`
  align-self: stretch;
  display: flex;
  margin: 10px;
  padding: 10px;
  /* on mobile */
  ${props => props.theme.breakpoints.down('sm')} {
    position: fixed;
    bottom: 0;
  }
`

export default function TodoCreater() {
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const [titleDraft, setTitleDraft] = useState('')
  const [contentDraft, setContentDraft] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const onAddTodo = async () => {
    const title = titleDraft
    const content = contentDraft

    if (title.length === 0)
      return

    const todo: Todo = { title, content }
    const addResult = await addTodos(todo)

    // access token is invalid
    if (addResult.status === 401) {
      console.log(addResult.message)
      const renewResult = await renewToken(refreshToken)
      if (renewResult.status === 200) {
        // trigger fetchTodos() to run again to get the todos list
        await onAddTodo()
      } else {
        // renew from server failed, need a new refresh token, navigate to /login
        router.push('/login')
      }
      return
    }

    // access token is valid, but failed to add todo for other reasons
    if (addResult.status !== 200) {
      console.log(addResult.message)
      return
    }

    // add result successful, trigger page refresh
    const todos = addResult.payload
    if (todos)
      dispatch(contentActions.setTodos(todos))
  }

  return (
    <Div>
      <TextField
        value={titleDraft}
        label='Title'
        onChange={e => setTitleDraft(e.target.value)}
        sx={{ flexGrow: 1 }} />
      <TextField
        value={contentDraft}
        label='Content'
        onChange={e => setContentDraft(e.target.value)}
        sx={{ flexGrow: 2 }} />
      <Button variant="contained"
        onClick={onAddTodo}
      >ADD</Button>
    </Div>
  )
}

