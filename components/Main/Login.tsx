import { Button, FormControl, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import { CenterContent, Stretch } from '../styled/containers'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { tokenActions } from '../../redux/slices/tokenSlice'
import { getJwtUser } from '../../utils'


const Div = styled(Stretch(CenterContent('div')))`
  /* layout */
  width: 30vw;
  height: 35vh;
`

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    try {
      const body = await res.json()
      if (res.status === 200) {
        dispatch(tokenActions.setRefreshToken(body.refreshToken))
        dispatch(tokenActions.setUser(getJwtUser(body.refreshToken)))
        router.push('/')
      } else {
        alert(body.message)
      }

    } catch (error) {
      alert(error)
    }
  }

  const handleClear = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <Div className="login-ctn">
      <Typography
        variant="h4"
        sx={{ textAlign: 'center' }}
      >Login</Typography>
      <FormControl>
        <TextField
          required
          id="outlined-required"
          name="email"
          type="email"
          label="Email"
          value={email}
          autoComplete="email"
          onChange={e => setEmail(e.target.value)}
          sx={{ m: 1 }}
        />
        <TextField
          id="outlined-password-input"
          name="current-password"
          type="password"
          label="Password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          sx={{ m: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ m: 1 }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClear}
          sx={{ m: 1 }}
        >
          Clear
        </Button>
      </FormControl>
      <Button sx={{ alignSelf: 'flex-start' }} >
        <Link href='/register'>Register</Link>
      </Button>
      <Typography variant="h4">or</Typography>
      <form action='/api/login-google'>
        <Button
          fullWidth
          variant="contained"
          color="success"
          sx={{ p: 1 }}
          type='submit'
        >
          Login with Google
        </Button>
      </form>
    </Div>
  )
}

export default Login
