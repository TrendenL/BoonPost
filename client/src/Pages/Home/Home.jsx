import { useState, useContext } from 'react'
import Posts from '../Posts/Posts'
import Pagination from '../../components/Pagination/Pagination'
import { UserContext } from '../../context/UserProvider'

import './home.css'

export default function Home() {

  const { posts } = useContext(UserContext)

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage ] = useState(4)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      <div className='home'>
        <Posts posts={currentPosts} />
      </div>
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  )
}
