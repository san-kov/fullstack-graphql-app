import React from 'react'

const Signup = () => {
  return (
    <div className="form">
      <h1>Sign Up</h1>
      <form action="">
        <input type="email" name="email" placeholder="email" />
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
