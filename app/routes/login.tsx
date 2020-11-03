import React from 'react'
import { Link } from 'react-router-dom'

interface LoginResponse {
  message: string
}

function login(email: string, password: string) {
  return fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default function Login() {
  const [requestInfo, setRequestInfo] = React.useState<{
    error: string | null
    status: 'loading' | 'initial' | 'finished'
  }>({
    error: null,
    status: 'initial',
  })
  const [{ email, password }, setCredentials] = React.useState({
    email: '',
    password: '',
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCredentials(previousCredentials => ({
      ...previousCredentials,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setRequestInfo({
      error: null,
      status: 'loading',
    })
    const response = await login(email, password)
    if (!response.ok) {
      const json: LoginResponse = await response.json()
      setRequestInfo({
        error: json.message,
        status: 'finished',
      })
      return
    }

    setRequestInfo({
      error: null,
      status: 'finished',
    })
    window.location.replace('/')
  }

  return (
    <div style={{ padding: 20 }}>
      <Link to="/signup">Sign up</Link>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          value={password}
          onChange={handleChange}
        />
        <button type="submit" disabled={requestInfo.status === 'loading'}>
          Log in
        </button>
        <div>
          {requestInfo.error && (
            <strong style={{ color: 'red', fontWeight: 400 }}>
              {requestInfo.error}
            </strong>
          )}
        </div>
      </form>
    </div>
  )
}
