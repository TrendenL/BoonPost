import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || '', 
    }
    
    const [ userState, setUserState ] = useState(initState)
    const [ publicState, setPublicState ] = useState({posts: []})
    const [ comments, setComments ] = useState([])
    const [ filtered, setFiltered ] = useState([])

    // signup
    function signup(credentials){
        axios.post('/auth/signup', credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => console.log(err))
    }
    // login
    function login(credentials){
        axios.post('/auth/login', credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => console.log(err))
    }

    // logout
    function logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: ""
        })
    }

    // get all posts
    function getAllPosts(){
        axios.get('/posts')
        .then(res => {
            setPublicState(prevPublicState => ({
                ...prevPublicState,
                posts: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // get user posts

    // add post
    function addPost(newPost){
        userAxios.post('/api/posts', newPost)
        .then(res => {
            setPublicState(prevPublicState => ({
                ...prevPublicState,
                posts: [...prevPublicState.posts, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // update post
    // function updatePost(postId){
    //     axios.put(`/api/posts/${postId}`)
    //         .then()
    //         .catch(err => console.log(err.response.data))
    // }



    // delete post
    // function deletePost(postId){
    //     axios.delete(`/api/posts/${postId}`)
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    // }

    // get comments
    function getComments(postId){
        userAxios.get(`/api/comments/${postId}`)
        .then(res => {(
            setComments(res.data)
        )})
        .catch(err => console.log(err))
    }

    // add comment
    function addComment(newComment, postId){
        userAxios.post(`/api/comments/${postId}`, newComment)
        .then()
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllPosts()
    }, [])

return (
        <UserContext.Provider 
            value={{
                ...userState,
                ...publicState,
                signup,
                login,
                logout,
                addPost,
                addComment,
                getComments,
                comments,
                filtered,
                setFiltered
            }}>
            {props.children}
        </UserContext.Provider>
    )
}
