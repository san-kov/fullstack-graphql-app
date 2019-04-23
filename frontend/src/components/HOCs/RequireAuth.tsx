import React, { PropsWithChildren, ReactNode } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { CurrentUser } from '../../generated/CurrentUser'
import { getCurrentUser } from '../../graphql/userQuery'
import LoaderScreen from '../LoaderScreent'
import { Redirect } from 'react-router'
interface IRequireAuthProps {
  children: ReactNode
}

const RequireAuth: React.SFC<IRequireAuthProps> = ({ children }) => {
  const { data, error, loading } = useQuery<CurrentUser>(getCurrentUser)
  if (loading) return <LoaderScreen />

  if (error || !data || !data.me) return <Redirect to="login" />

  return <div>{children}</div>
}

export default RequireAuth
