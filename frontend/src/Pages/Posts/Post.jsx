import { Link } from 'react-router-dom'

import './posts.css'

export default function Post(props) {
    const { title, content, categories, image, _id } = props
return (
    <div className='post'>
        <img src={image} alt='' />
        <div className='post-info'>
            <div className='post-cats'>
                <span className='post-cat'>{categories}</span>
            </div>
                <span className='post-title'>{title}</span>
            
            <hr/>
            <span className='post-date'>1 hour ago</span>
        </div>
        <p className='post-desc'>
            {content}
        </p>
        <div className='rm-btn'>
                <Link to={`/home/${_id}`}><button className='read-more'>READ MORE</button></Link>
            
        </div>
    </div>
    )
}
