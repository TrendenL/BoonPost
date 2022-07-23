import { useState } from 'react'

import './write.css'

export default function Write(props) {
    const initInputs = {
        image: props.image || '',
        title: props.title || '',
        content: props.content || '',
        categories: props.categories || ''
    }

    const [ inputs, setInputs ] = useState(initInputs)

    const { addPost } = props

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
        addPost(inputs)
        setInputs(initInputs)
    }

    return (
    <div className='write-container'>
            
            <form className='writeForm' onSubmit={handleSubmit}>
                    <input type='text' name='image' value={image} placeholder='Image' onChange={handleChange} className='writeImage'/>
                <div className='writeFormGroup'>
                    <input type='text' name='title' value={title} placeholder='Title' onChange={handleChange} className='writeInput' autoFocus={true}/>
                </div>

                <div className='writeFormGroup'>
                    <textarea placeholder='Tell your story...' type='text' name='content' value={content} onChange={handleChange} className='writeInput writeText'></textarea>
                </div>

                <div className='chooseCategory'>
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
                <button className='writeSubmit'>Publish</button>
            </form>
        </div>
)
}
