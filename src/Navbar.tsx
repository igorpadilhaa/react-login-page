import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

import './Navbar.css';

function link(name: string, url: string) {
    return { name, url }
}

function Navbar() {
    const { user, logout } = useAuth()

    const location = useLocation()
    const navigate = useNavigate()

    console.log(location);

    const links = [ link('Home', '/') ];
    let buttonAction: () => void;

    if (user) {
        links.push(link('Profile', '/profile'));
        buttonAction = () => logout();

    } else {
        buttonAction = () => {
            navigate('/login')
        }
    }

    const showButton = location.pathname !== '/login';

    return (
        <nav>
            <ul className='navbar'>
                {
                    links.map((l, idx) => (
                        <li key={idx}>
                            <a href={l.url}>{l.name}</a>
                        </li>
                    ))
                }

                {showButton && <li key={links.length}><button onClick={buttonAction}>{user? 'Logout' : 'Login'}</button></li>}
            </ul>
        </nav>
    )
}

export default Navbar;