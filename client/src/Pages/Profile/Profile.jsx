import React, {useContext, useEffect } from 'react'
import PostList from '../../components/PostList/PostList'
import { UserContext } from '../../context/UserProvider'
import moment from 'moment'

import './Profile.css'

export default function Profile() {
  const { deletPost, getUserPosts, userState: {posts},  user: {username, image, memberSince} } = useContext(UserContext)

  useEffect(() => {
    getUserPosts()
  }, [])

  const formatDate = moment(memberSince).format('MMM do YYYY')
  

  return (
    <div className='profile-container'>
      <div className='profile'>
        <img className='profile-img' src={image} alt="" />

        <div className='profile-header'>
          <h1>{username}</h1>
          <div className='member'>
            <p>member since:</p>
            <p>{formatDate}</p>
          </div>
        </div>
        <h2>My Blogs</h2>
        <PostList posts={posts} deletePost={deletPost} />
      </div>
      
    </div>
  )
}
