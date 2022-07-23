import React from 'react'
import UserPosts from './UserPosts'

export default function PostList(props) {
    const { posts } = props

  return (
    <div className='userPost-container'>
        { posts.map(post => <UserPosts {...post} key={post._id}/>)}
    </div>
  )
}
