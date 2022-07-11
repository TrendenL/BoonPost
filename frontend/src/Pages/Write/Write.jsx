import { useState } from 'react'

import './write.css'

export default function Write(props) {
    const initInputs = {
        title: '',
        content: '',
        categories: 'Life'
    }

    const [ inputs, setInputs ] = useState(initInputs)

    const { addPost } = props

    const { title, content } = inputs

    function handleChange(e){
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addPost(inputs)
        setInputs(initInputs)
    }

    return (
    <div className='write-container'>
            <img className='writeImg' src='https://images.unsplash.com/photo-1655439190758-9c45e814d2a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80' alt='mountains'/>
            <form className='writeForm' onSubmit={handleSubmit}>
                    <label htmlFor='fileInput'>
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                <div className='writeFormGroup'>
                    <input type='file' name='image' id='fileInput' style={{display: 'none'}}/>
                    <input type='text' name='title' value={title} placeholder='Title' onChange={handleChange} className='writeInput' autoFocus={true}/>
                </div>

                <div className='writeFormGroup'>
                    <textarea placeholder='Tell your story...' type='text' name='content' value={content} onChange={handleChange} className='writeInput writeText'></textarea>
                </div>

                {/* <div className='chooseCategory'>
                    <fieldset>
                        <input type='radio' />
                        <label>life</label>
                        <input type='radio' />
                        <input type='radio' />
                        <input type='radio' />
                        <input type='radio' />
                    </fieldset>
                </div> */}
                <button className='writeSubmit'>Publish</button>
            </form>
        </div>
)
}
