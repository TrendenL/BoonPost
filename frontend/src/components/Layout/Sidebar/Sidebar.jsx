import { useContext } from 'react'
import { UserContext } from '../../../context/UserProvider'
import axios from 'axios'

import './sidebar.css'

export default function Sidebar() {

  const { setFiltered } = useContext(UserContext)

  // const { setPublicState } = useContext(UserContext)

  function handleFilter(e){
    axios.get(`/posts/search/categories?categories=${e.target.value}`)
    .then(res => setFiltered(res.data))
    .catch(err => console.log(err))
  }
  return (
    <div className='sidebar'>
        <div className='categories'>
            <span className='cat-head'>Categories</span>
              <ul className='categories-list' onClick={handleFilter}>
                  <button className='list-items' value='Life'>Life</button>
                  <button className='list-items' value='Music'>Music</button>
                  <button className='list-items' value='Fashion'>Fashion</button>
                  <button className='list-items' value='Sports'>Sports</button>
                  <button className='list-items' value='Cinema'>Cinema</button>
                  <button className='list-items' value='Tech'>Tech</button>
              </ul>
        </div>
    </div>
  )
}
