import { Link } from 'react-router-dom';
import {ReactComponent as Logo} from './logo.svg';
import './styles.css';

const Navbar: React.FC = () => {
    return (
        <nav className="main-navbar">
            <Logo />
            <Link className="logo-text" to="/">DS Delivery</Link>
        </nav>
    )
}

export default Navbar;