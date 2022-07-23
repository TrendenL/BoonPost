import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserProvider'

import './comment.css'

export default function CommentForm(props) {
    const initInputs = {
        comment: ''
    }

    const { addComment } = useContext(UserContext)

    const { id } = props

    const [ inputs, setInputs ] = useState(initInputs)

    function handleChange(e){
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [ name ]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addComment(inputs, id)
        setInputs(initInputs)
    }

    const { comment } = inputs
    return (
        <div className='comment-form'>
            <form onSubmit={handleSubmit}>
                <textarea
                    type='text'
                    name='comment'
                    value={comment}
                    placeholder='Comment...'
                    onChange={handleChange}
                />
                <button>add comment</button>
            </form>
        </div>
    )
}
