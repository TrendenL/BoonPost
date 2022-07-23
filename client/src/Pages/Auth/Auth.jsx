import React, { useState, useContext} from 'react'
import AuthForm from './AuthForm'
import { UserContext } from '../../context/UserProvider'

import './auth.css'

export default function Auth() {

    const { signup, login } = useContext(UserContext)

    const initInputs = { username: '', password: ''}
    const [ inputs, setInputs ] = useState(initInputs)
    const [ toggle, setToggle ] = useState(false)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function handleGuest(){
        const guestLogin = {
            username: 'Guest',
            password: 'password'
        }

        login(guestLogin)
    }

    function toggleForm(){
        setToggle(prev => !prev)
    }

return (
    <div className='auth-container'>
        <div className='auth'>
            { !toggle ?
                <>
                    <AuthForm
                        topText='User Login'
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText='Login'
                        // errMsg={errMsg}
                        handleGuest={handleGuest}
                    />
                    <p onClick={toggleForm}>Not a member?</p>
                </>
                :
                <>
                    <AuthForm 
                        topText='Register'
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText='Sign up'
                        // errMsg={errMsg}
                        handleGuest={handleGuest}
                    />
                    <p onClick={toggleForm}>Already a member?</p>
                </>
            }
        </div>
    </div>
)
}
