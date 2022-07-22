import './comment.css'

export default function CommentList(props) {

  const { comment, username } = props

  return (
    <div className='comment-list'>
      <p>{comment} <span>-{username}</span></p>
    </div>
  )
}
