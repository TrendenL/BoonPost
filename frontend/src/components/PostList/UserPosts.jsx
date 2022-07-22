import React, {useContext, useState } from 'react'
import { UserContext } from '../../context/UserProvider'
import EditForm from '../EditForm/EditForm'
import moment from 'moment'

import './PostList.css'

export default function UserPosts(props) {
  const { user: { username }, createdAt, image, title, content, _id } = props

  const [editToggle, setEditToggle] = useState(false)

  const { deletePost, updatePost } = useContext(UserContext)

  const timeAgo = moment(createdAt).fromNow()


  return (
    <div className='userPost-container'>
      {
        !editToggle ?
          <div className='userPost-wrapper'>
                    <img className='singlePostImg' src={image} alt='mountains'/>
                        <h1 className='singlePostTitle'>
                            {title}
                            <div className='singlePostEdit'>
                                <i className='singlePostIcon fa-regular fa-pen-to-square'></i>
                                <i className='singlePostIcon fa-regular fa-trash-can'></i>
                            </div>
                        </h1>

                        <div className='singlePostInfo'>
                            <span className='singlePostAuthor'>Author: <b>{username}</b></span>
                            <span className='singlePostDate'>created: <b>{timeAgo}</b></span>
                        </div>
                        <p className='singlePostDesc'>{content}</p>
                      <div className='post-btns'>
                        <button className='delete-btn' onClick={() => deletePost(_id)}>delete</button>
                        <button className='edit-btn' onClick={() => setEditToggle(prevToggle => !prevToggle)}>Edit</button>
                      </div>
              </div>

              :
              
              <>
                <EditForm img={image} title={title} content={content} setEditToggle={setEditToggle} updatePost={updatePost} id={_id}/>
              </>

      }
    </div>
  )
}
