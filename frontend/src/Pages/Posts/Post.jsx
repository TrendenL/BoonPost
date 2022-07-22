import { Link } from 'react-router-dom'
import moment from 'moment'

import './posts.css'

export default function Post(props) {
    const { title, content, categories, image, createdAt, _id } = props

    const timeAgo = moment(createdAt).fromNow()
return (
    <div className='post'>
        <img src={image} alt='' />
        <div className='post-info'>
            <div className='post-cats'>
                <span className='post-cat'>{categories}</span>
            </div>
                <span className='post-title'>{title}</span>
            
            <hr/>
            <span className='post-date'>{timeAgo}</span>
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
