import React from 'react'

const Login = () => {
  return (
    <div className="form">
      <h1>Log In</h1>
      <form action="">
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login
