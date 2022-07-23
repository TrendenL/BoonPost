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
        posts: [],
        error: ''
    }
    
    const [ userState, setUserState ] = useState(initState)
    const [ publicState, setPublicState ] = useState({posts: []})
    const [ comments, setComments ] = useState([])

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
            token: "",
            posts: []
        })
    }

    // get all posts
    function getAllPosts(){
        userAxios.get('/api/posts')
        .then(res => {
            setPublicState(prevPublicState => ({
                ...prevPublicState,
                posts: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // get user posts
    function getUserPosts(){
        userAxios.get('/api/posts/user')
        .then(res => {
            setUserState( prevUserState => ({
                ...prevUserState,
                posts: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

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
    function updatePost(updates, postId){
        userAxios.put(`/api/posts/${postId}`, updates)
        .then(res => setUserState(prevUserState => ({
            ...prevUserState,
            posts: prevUserState.posts.map(post => post._id !== postId ? post : res.data)
            })))
        .catch(err => console.log(err.response.data))
        getAllPosts()
    }



    // delete post
    function deletePost(postId){
        userAxios.delete(`/api/posts/${postId}`)
        .then(res => setUserState(prevUserState => ({
            ...prevUserState,
            posts: prevUserState.posts.filter(post => post._id !== postId)
        })))
        .catch(err => console.log(err))
        getAllPosts()
    }

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
        .then(res => {
            setComments(prevComments => (
                [...prevComments, res.data]
            ))
        })
        .catch(err => console.log(err))
    }

    // filter by category
    function handleFilter(e){
        if(e.target.value === 'reset'){
            getAllPosts()
        } else {
            axios.get(`/posts/search/categories?categories=${e.target.value}`)
            .then(res => setPublicState(prevPublicState => ({
                ...prevPublicState,
                posts: res.data
            })))
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        getAllPosts()
        getUserPosts()
    }, [])

    

return (
        <UserContext.Provider 
            value={{
                userState,
                ...userState,
                getUserPosts,
                ...publicState,
                signup,
                login,
                logout,
                addPost,
                addComment,
                getComments,
                comments,
                handleFilter,
                deletePost,
                updatePost
            }}>
            {props.children}
        </UserContext.Provider>
    )
}
