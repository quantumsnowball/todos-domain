import {
  styled,
  Typography
} from '@mui/material'
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { contentActions } from '../../../redux/slices/contentSlice';
import { RootState } from '../../../redux/store';
import { TodoWithId } from '../../../types';
import { getTodos } from '../../../utils/frontend/fetch';
import { CenterContent, Stretch, Overflow } from '../../styled/containers'
import TodoCard from './TodoCard';
import TodoCreator from './TodoCreator';


const TodosDiv = styled(Overflow(Stretch(CenterContent('div'))))`
  max-width: 800px;
`

const TodosContentDiv = styled(Overflow(Stretch(CenterContent('div'))))`
  justify-content: flex-start;
  /* text */
  text-align: left;
`;

const LoggedOutDiv = styled(Stretch(CenterContent('div')))`
`;

export default function Homepage() {
  const dispatch = useDispatch()
  const refreshToken = useSelector((s: RootState) => s.token.refreshToken)
  const todos = useSelector((s: RootState) => s.content.todos)

  useEffect(() => {
    const fetchTodos = async () => {
      const getResult = await getTodos()
      // access token is invalid
      // TODO
      // if (getResult.status === 401) {
      //   console.log(getResult.message)
      //   const renewResult = await renewToken(refreshToken)
      //   if (renewResult.status === 200) {
      //     // trigger fetchTodos() to run again to get the todos list
      //     await fetchTodos()
      //   } else {
      //     // renew from server failed, need a new refresh token, navigate to /login
      //     // navigate('/login') // TODO
      //   }
      //   return
      // }
      // access token is valid, but failed to read todo for other reasons
      if (getResult.status !== 200) {
        console.log(getResult.message)
        return
      }
      // successfully fetch todos list 
      const todos = getResult.payload
      if (todos)
        dispatch(contentActions.setTodos(todos))
    }
    fetchTodos()
  }, [])

  return (
    <>
      {refreshToken ?
        <>
          <TodosDiv className='todos-ctn'>
            <TodosContentDiv className='todosContent-ctn'>
              {todos.map((todo: TodoWithId) => <TodoCard key={todo._id} {...todo} />)}
            </TodosContentDiv>
            <TodoCreator />
          </TodosDiv>
        </>
        :
        <LoggedOutDiv>
          <Typography variant="h5">
            Please <Link href="/login">Login</Link> to view your Todo list.
          </Typography>
        </LoggedOutDiv>
      }
    </>
  )
}

