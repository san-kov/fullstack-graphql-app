import React from 'react'
import RequireAuth from '../components/HOCs/RequireAuth'

const Profile = () => {
  return (
    <RequireAuth>
      <div>hi</div>
    </RequireAuth>
  )
}

export default Profile
