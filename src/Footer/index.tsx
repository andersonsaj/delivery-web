import {ReactComponent as YoutubeIcon} from './youtube.svg';
import {ReactComponent as LinkedinIcon} from './linkedin.svg';
import {ReactComponent as InstagramIcon} from './instagram.svg';

import './styles.css';

function Footer() {
    return (
        <footer className="main-footer">
            App desenvolvido durante a 2ª ed. do evento Semana DevSuperior
            <div className="footer-icons">
                <a href="https://www.youtube.com" target="_new">
                    <YoutubeIcon/>
                </a>

                <a href="https://www.linkedin.com/in/anderson-barretosb09/" target="_new">
                    <LinkedinIcon />
                </a>

                <a href="https://www.instagram.com/andersonsb09" target="_new">
                    <InstagramIcon />
                </a>
            </div>
        </footer>
    )
}

export default Footer;