import {logo} from "../constants/main.js";
import "./style.css";

const Navbar = () => {

    return (
        <nav >
            <img className="navbar-items" id="logo" src={logo} alt="logo"/>
            <ul className="navbar-list">
                <li className="navbar-items">
                    <div className="link"  >Home</div>
                </li>
                <li className="navbar-items">
                    <div className="link"  >Community</div>
                </li>
                <li className="navbar-items">
                    <div className="link"  >Feed</div>
                </li>
                <li className="navbar-items">
                    <div className="link"  >Projects</div>
                </li>
            </ul>


        </nav>
    );
};

export default Navbar;
