import React from 'react'

const Header: React.SFC<{}> = () => {
  return (
    <div className="header">
      <nav>
        <a className="logo">SeriesQL</a>
      </nav>
      <nav>
        <a href="#">Log In</a>
        <a href="#">Sign Up</a>
      </nav>
    </div>
  )
}

export default Header
