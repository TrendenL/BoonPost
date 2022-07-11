import React, {useContext} from 'react'
import { UserContext } from '../../context/UserProvider'

export default function Profile() {
  const { user: {username} } = useContext(UserContext)
  return (
    <div>Profile
      <h1>{username}</h1>
      
    </div>
  )
}
