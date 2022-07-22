import React, { useState } from 'react'

import './EditForm.css'

export default function EditForm(props) {

    const { setEditToggle } = props
    console.log(props)

    const initInputs = {
        image: props.img ,
        title: props.title ,
        content: props.content,
        categories: props.categories
    }

    const [ inputs, setInputs ] = useState(initInputs)

    const { title, content, image, categories } = inputs

    function handleChange(e){
        const { name, value, type, checked } = e.target
        setInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: type === 'checkbox' ? checked : value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        props.updatePost(inputs, props.id)
        setInputs(initInputs)
    }

    console.log(inputs)

return (
    <div>
        <form className='editForm' onSubmit={handleSubmit}>
                    <input type='text' name='image' value={image} placeholder='Image' onChange={handleChange} className='editImage'/>
                <div className='editFormGroup'>
                    <input type='text' name='title' value={title} placeholder='Title' onChange={handleChange} className='editInput' autoFocus={true}/>
                </div>

                <div className='editFormGroup'>
                    <textarea placeholder='Tell your story...' type='text' name='content' value={content} onChange={handleChange} className='editInput editText'></textarea>
                </div>

                <div className='editCategory'>
                    <fieldset>
                        <legend>Blog category</legend>

                        <input type='radio' id='Life' name='categories' value='Life' checked={categories === 'Life'} onChange={handleChange} />
                        <label>Life</label>

                        <input type='radio' id='Music' name='categories' value='Music' checked={categories === 'Music'} onChange={handleChange} />
                        <label htmlFor='Music'>Music</label>

                        <input type='radio' id='Fashion' name='categories' value='Fashion' checked={categories === 'Fashion'} onChange={handleChange} />
                        <label htmlFor='Fashion'>Fashion</label>

                        <input type='radio' id='Sports' name='categories' value='Sports' checked={categories === 'Sports'} onChange={handleChange} />
                        <label htmlFor='Sports'>Sports</label>

                        <input type='radio' id='Cinema' name='categories' value='Cinema' checked={categories === 'Cinema'} onChange={handleChange} />
                        <label htmlFor='Cinema'>Cinema</label>

                        <input type='radio' id='Tech' name='categories' value='Tech' checked={categories === 'Tech'} onChange={handleChange} />
                        <label htmlFor='Tech'>Tech</label>
                    </fieldset>
                </div>
                <div className='edit-btns'>
                    <button className='edit-submit'>Submit Edit</button>
                    <button className='close-btn' onClick={() => setEditToggle(prevToggle => !prevToggle)}>Close</button>
                </div>
            </form>
    </div>
    )
}
