import React, { PropsWithChildren, ReactNode } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { CurrentUser } from '../../generated/CurrentUser'
import { getCurrentUser } from '../../graphql/userQuery'
import Loader from '../Loader'
interface IWithUserProps {
  children: ReactNode
}

const WithUser: React.SFC<IWithUserProps> = ({ children }) => {
  const { data, error, loading } = useQuery<CurrentUser>(getCurrentUser)
  if (loading) return <Loader />

  if (error || !data || !data.me) return null

  return <>{children}</>
}

export default WithUser
