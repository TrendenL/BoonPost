import { useContext } from 'react'
import { UserContext } from '../../../context/UserProvider'

import './sidebar.css'

export default function Sidebar() {

  const { handleFilter } = useContext(UserContext)

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
                  <button className='list-items' value='reset'>All</button>
              </ul>
        </div>
    </div>
  )
}
