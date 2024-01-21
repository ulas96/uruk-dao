import {logo} from "../constants/main.js";
import "./style.css";
import {Link} from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Navbar = () => {

    return (
        <nav>
            <Link className="link" to="/" ><img className="navbar-items" id="logo" src={logo} alt="logo"/> </Link>
            <ul className="navbar-list">

                <li className="navbar-items">
                    <Link className="link" to="/community">Community</Link>
                </li>
                <li className="navbar-items">
                    <Link className="link" to="/feed">Feed</Link>
                </li>
                <li className="navbar-items">
                    <Link className="link" to="/profile">Profile</Link>
                </li>
            </ul>


            <ConnectButton />
        </nav>
    );
};

export default Navbar;
