import React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { getCurrentUser, logout } from '../graphql/userQuery'
import { CurrentUser } from '../generated/CurrentUser'
import { Logout } from '../generated/Logout'

const Header: React.SFC<RouteComponentProps> = ({
  history: {
    push,
    location: { pathname }
  }
}) => {
  const { data, loading, error } = useQuery<CurrentUser>(getCurrentUser)
  const handleLogout = useMutation<Logout>(logout, {
    refetchQueries: [{ query: getCurrentUser }]
  })

  let authorized: boolean

  console.log(data)
  if (loading) return null
  if (!data || error || !data.me) authorized = false
  else authorized = true

  return (
    <div className="header">
      <nav>
        <Link to="/" className="logo">
          SeriesQL
        </Link>
      </nav>
      {authorized ? (
        <nav>
          <a
            href="#"
            onClick={async e => {
              e.preventDefault()
              await handleLogout()
              push('/login')
            }}
          >
            Logout
          </a>
          <Link to="/profile">{data!.me!.username}</Link>
        </nav>
      ) : (
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
      )}
    </div>
  )
}

export default withRouter(Header)
