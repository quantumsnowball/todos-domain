import {
  styled,
  Card, Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTodo, renewToken } from '../../../utils/frontend/fetch'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { Stretch } from '../../styled/containers'
import { contentActions } from "../../../redux/slices/contentSlice"
import { useRouter } from 'next/router'


const FlexCard = styled((Card))`
  min-height: 100px;
  display: flex;
  margin: 5px;
  padding: 5px;
`

const ContentDiv = styled(Stretch('div'))`
`

interface TodoCardProps {
  _id: string
  title: string,
  content: string
}

export default function TodoCard({ _id, title, content }: TodoCardProps) {
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const onDeleteTodo = async () => {
    const deleteResult = await deleteTodo({ _id })

    // access token is invalid
    if (deleteResult.status === 401) {
      console.log(deleteResult.message)
      const renewResult = await renewToken(refreshToken)
      if (renewResult.status === 200) {
        // trigger onDeleteTodo() to run again to get the todos list
        await onDeleteTodo()
      } else {
        // renew from server failed, need a new refresh token, navigate to /login
        router.push('/login')
      }
      return
    }

    // access token is valid, but failed to add todo for other reasons
    if (deleteResult.status !== 200) {
      console.log(deleteResult.message)
      return
    }

    // add result successful, trigger page refresh
    const todos = deleteResult.payload
    if (todos)
      dispatch(contentActions.setTodos(todos))
  }
  return (
    <FlexCard sx={{ margin: '5px', padding: '5px' }}>
      <ContentDiv>
        <Typography noWrap variant={isMobile ? "h6" : "h5"}>{title}</Typography>
        <Typography noWrap variant={isMobile ? "subtitle1" : "h6"}>{content}</Typography>
      </ContentDiv>
      <IconButton
        size="large"
        onClick={onDeleteTodo}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </FlexCard>
  )
}

