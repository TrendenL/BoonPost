import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider'
import CommentForm from '../../components/Comment/CommentForm'
import CommentList from '../../components/Comment/CommentList'

import './singlePost.css'

export default function SinglePost(props) {

    const {postId} = useParams()
    console.log(postId)

    const { posts, comments, getComments } = useContext(UserContext)
    const thisPost = posts.find(post => post._id === postId)
    
    const mappedComments = comments.map(comment => <CommentList {...comment} key={comment._id} />)

    const { user: {username} } = thisPost

    useEffect(() => {
        getComments(thisPost._id)
    }, [])
    
    console.log(comments)
    return (
        <div className='singlePost'>
                <div className='post-wrapper'>
                <img className='singlePostImg' src='https://images.unsplash.com/photo-1655439190758-9c45e814d2a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80' alt='mountains'/>
                    <h1 className='singlePostTitle'>
                        {thisPost.title}
                        <div className='singlePostEdit'>
                            <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
                            <i className="singlePostIcon fa-regular fa-trash-can"></i>
                        </div>
                    </h1>

                    <div className='singlePostInfo'>
                        <span className='singlePostAuthor'>Author: <b>{username}</b></span>
                        <span className='singlePostDate'>1 hour ago</span>
                    </div>
                    <p className='singlePostDesc'>{thisPost.content}</p>
                </div>

                <div>
                    <CommentForm {...thisPost} id={thisPost._id} />

                    <div className='comment'>
                        {mappedComments}
                    </div>
                </div>
            </div>
)
}
