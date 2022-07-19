
import Post from './Post'

import './posts.css'

export default function Posts({posts}) {
  const mappedPost = posts.map(post => 
    <Post {...post} key={post._id}  />
  )
    console.log(posts)
  return (
    <div className='posts-page'>
    <div className='post-head'>
      <h1>BoonPost.</h1>
    </div>
    <div className='posts'>
      {mappedPost}
    </div>

    </div>
  )
}
