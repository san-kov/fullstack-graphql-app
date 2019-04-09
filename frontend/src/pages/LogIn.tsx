import React from 'react'
import { TiLockClosed, TiMail } from 'react-icons/ti'
const Login = () => {
  return (
    <div className="form">
      <h1>Log In</h1>
      <form action="">
        <div className="icon-input">
          <TiMail size="20" />
          <input type="email" name="email" placeholder="email" />
        </div>
        <div className="icon-input">
          <TiLockClosed size="20" />
          <input type="password" name="password" placeholder="password" />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login
