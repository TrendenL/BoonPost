import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserProvider'
import CommentForm from '../../components/Comment/CommentForm'
import CommentList from '../../components/Comment/CommentList'
import moment from 'moment'

import './singlePost.css'

export default function SinglePost(props) {

    const {postId} = useParams()

    const { posts, comments, getComments } = useContext(UserContext)
    const thisPost = posts.find(post => post._id === postId)
    
    const mappedComments = comments.map(comment => <CommentList {...comment} key={comment._id} />)

    const { image, createdAt, user: {username} } = thisPost

    const timeAgo = moment(createdAt).fromNow()

    useEffect(() => {
        getComments(thisPost._id)
    }, [])
    
    console.log(comments)
    return (
        <div className='singlePost'>
                <div className='post-wrapper'>
                <img className='singlePostImg' src={image} alt='mountains'/>
                    <h1 className='singlePostTitle'>
                        {thisPost.title}
                        <div className='singlePostEdit'>
                            <i className="singlePostIcon fa-regular fa-pen-to-square"></i>
                            <i className="singlePostIcon fa-regular fa-trash-can"></i>
                        </div>
                    </h1>

                    <div className='singlePostInfo'>
                        <span className='singlePostAuthor'>Author: <b>{username}</b></span>
                        <span className='singlePostDate'>created: <b>{timeAgo}</b></span>
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
