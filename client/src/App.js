import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Layout/Sidebar/Sidebar'
import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import Profile from './Pages/Profile/Profile'
import Write from './Pages/Write/Write'
import Navbar from './components/Layout/Navbar/Navbar'
import SinglePost from './Pages/SinglePost/SinglePost'
import { UserContext } from './context/UserProvider'

import './app.css'

export default function App() {
    const { token, logout, addPost } = useContext(UserContext)
    return (
            <div className='main-container'>
                { token && <Navbar logout={logout}/> }
                <Routes>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/write' element={<Write addPost={addPost} />}/>
                    <Route path='/' element={ token ? <Navigate to='/home' /> : <Auth />}/>
                    <Route path='/profile' element={<Profile />}/>
                    <Route path='/home/:postId' element={<SinglePost />}/>
                </Routes>
                { token && <Sidebar /> }
            </div>
    )
}
