import {logo} from "../constants/main.js";
import "./style.css";
import {Link} from "react-router-dom";

const Navbar = ({member}) => {

    return (
        <nav>
            <img className="navbar-items" id="logo" src={logo} alt="logo"/>
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

            <div className="account">
                <div className="account-address">
                    <p>{member.memberAddress !== null ? `${member.nickname}` : "Connect Wallet"}</p>
                    <p>{member.memberAddress !== null ? `${String(member.memberAddress).slice(0, 5)}...${String(member.memberAddress).slice(39, 42)}` : "" +
                        ""}</p>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
