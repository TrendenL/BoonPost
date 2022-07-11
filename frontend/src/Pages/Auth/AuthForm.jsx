import React from 'react'

export default function AuthForm(props) {
    const { handleGuest, handleChange, handleSubmit, topText, btnText, inputs: { username, password }} = props
    return (
        <div>
            <h2>BoonePost.</h2>
            <form onSubmit={handleSubmit}>
                <h3>{ topText }</h3>
                <input type='text' value={username} name='username' onChange={handleChange} placeholder='Enter username...' />
                <input type='password' value={password} name='password' onChange={handleChange} placeholder='Enter password...' />
                <button>{ btnText}</button>
                <p onClick={handleGuest}>or Guest Login</p>
            </form>
        </div>
    )
}
