import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.SFC<{}> = () => {
  return (
    <div className="header">
      <nav>
        <Link to="/" className="logo">
          SeriesQL
        </Link>
      </nav>
      <nav>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </div>
  )
}

export default Header
