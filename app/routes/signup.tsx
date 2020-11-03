import React from 'react'
import { Link } from 'react-router-dom'

interface SignupResponse {
  message: string
}

function signup(email: string, name: string, password: string) {
  return fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      name,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default function Signup() {
  const [requestInfo, setRequestInfo] = React.useState<{
    error: string | null
    status: 'loading' | 'initial' | 'finished'
  }>({
    error: null,
    status: 'initial',
  })
  const [{ email, name, password }, setCredentials] = React.useState({
    email: '',
    name: '',
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
    const response = await signup(email, name, password)
    if (!response.ok) {
      const json: SignupResponse = await response.json()
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
      <Link to="/login">Log in</Link>
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
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          value={name}
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
