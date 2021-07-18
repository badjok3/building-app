import { Link } from 'react-router-dom';

let Home = () => {
    return (
        <div className='title-screen'>
            <Link to='/buildings' className='buildings-title' alt='Buildings Title' title='Buildings'>Buildings</Link>
            <p alt='description' className='description'>
                Welcome to my hand-built buildings application, which is built to build buildings logs.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            </p>
        </div>
    )
}

export default Home;