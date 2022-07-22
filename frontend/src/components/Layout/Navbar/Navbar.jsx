import React, { useContext } from 'react'
import { Link} from 'react-router-dom'
import { BiLogInCircle, BiHomeCircle, BiPencil } from 'react-icons/bi'
import { UserContext } from '../../../context/UserProvider'

import './navbar.css'

export default function Navbar(props) {
  const { user: {image} } = useContext(UserContext)

  return (
    <div className='nav-container'>
      <div className='navbar'>
          <div className='logo'>
            <Link to='/'>BP.</Link>
          </div>
          <ul className='icons'>
            <li>
              <Link to='/home'><BiHomeCircle size={25}/></Link>
            </li>
            <li>
              <Link to='/write'><BiPencil size={25}/></Link>
            </li>
            <hr/>
            <li>
              <Link to='/'><BiLogInCircle size={25} onClick={props.logout} /></Link>
            </li>
          </ul>

        <div className='profile-pic'>
          <Link to='/profile'><img src={ image ? image : 'https://images.unsplash.com/photo-1586731790190-c607b3c32150?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'}  alt='default pic'/></Link>
        </div>
        </div>

      </div>
  )
}
