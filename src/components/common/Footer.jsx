import { Link } from 'react-router-dom';

let Footer = () => {
    return (
        <div className='footer'>
            <div className='footer-links'>
                <Link to='/' className='col-lg-1 col-md-2'>Home</Link>
                <Link to='/buildings' className='col-lg-1 col-md-2'>Buildings</Link>
            </div>
            <h3 className='footer-title offset-lg-4'>Welcome to Building Builder</h3>
        </div>
    )
}

export default Footer;