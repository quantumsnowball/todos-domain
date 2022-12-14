import { Button, FormControl, styled, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { CenterContent, Stretch } from '../styled/containers'


const Div = styled(Stretch(CenterContent('div')))`
  /* layout */
  width: 50vw;
  height: 35vh;
  /* on mobile */
  ${props => props.theme.breakpoints.down("sm")} {
    width: 80vw;
  }
`

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setPasswordMatch(password === passwordAgain)
  }, [password, passwordAgain])

  const handleRegister = async () => {
    if (!passwordMatch) {
      alert('Password does not match, please try again!')
      return
    }
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    try {
      const body = await res.json()
      alert(body.message)
      router.push('/login')
    } catch (error) {
      alert(error)
    }
  }

  const handleClear = () => {
    setEmail('')
    setPassword('')
    setPasswordAgain('')
    setPasswordMatch(false)
  }

  return (
    <Div>
      <Typography
        variant="h4"
        sx={{ textAlign: 'center' }}
      >Register</Typography>
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
        <TextField
          id="outlined-password-again-input"
          name="current-password"
          type="password"
          label="Confirm Password"
          value={passwordAgain}
          autoComplete="current-password"
          onChange={e => setPasswordAgain(e.target.value)}
          error={!passwordMatch}
          helperText={passwordMatch ? 'Password is confirmed' : 'Passwords does not match'}
          sx={{ m: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{ m: 1 }}
        >
          Register
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClear}
          sx={{ m: 1 }}
        >
          Reset
        </Button>
      </FormControl>
      <Button sx={{ alignSelf: 'flex-start' }} >
        <Link href='/login'>Login</Link>
      </Button>
    </Div>
  )
}

