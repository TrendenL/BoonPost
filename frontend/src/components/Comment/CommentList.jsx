import './comment.css'

export default function CommentList(props) {

  const { comment } = props

  return (
    <div className='comment-list'>
      <p>{comment}</p>
    </div>
  )
}
