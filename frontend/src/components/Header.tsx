import React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

const Header: React.SFC<RouteComponentProps> = ({
  history: {
    location: { pathname }
  }
}) => {
  return (
    <div className="header">
      <nav>
        <Link to="/" className="logo">
          SeriesQL
        </Link>
      </nav>
      <nav>
        <Link
          to="/login"
          className={pathname === '/login' ? 'active-link' : ''}
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className={pathname === '/signup' ? 'active-link' : ''}
        >
          Signup
        </Link>
      </nav>
    </div>
  )
}

export default withRouter(Header)
