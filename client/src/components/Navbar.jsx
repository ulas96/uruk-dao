import {logo} from "../constants/main.js";
import "./style.css";
import {Link} from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Popup from 'reactjs-popup';
import { useState } from "react";
const Navbar = () => {

    const [isCreate, setIsCreate] = useState(false);
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleOpen = () => {
        setIsCreate(true);
    };

    const handleClose = () => {
        const closeAlert = window.confirm("Are you sure you want to close the popup?");

        if (closeAlert && isCreate) {
            setIsCreate(false);
        } else if (!closeAlert && isCreate) {
            setIsCreate(true);
        }

    };
    return (
        

        <nav>
           <Link className="link" to="/" ><img className="navbar-items" id="logo" src={logo} alt="logo"/> </Link>
            <ul className="navbar-list">

                <li className="navbar-items">
                    <Link className="link" to="/community">Community</Link>
                </li>
                <li className="navbar-items">
                    <Link className="link" onClick={handleOpen}>
                        Create
                    </Link>
                    {
                        isCreate && 
                            <Popup open={isCreate} closeOnDocumentClick={false}  closeOnEscape={false} >
                                <div className="content">
                                    <textarea className="create-input" type="text" value={text} onChange={handleChange} />
                                    <button onClick={handleClose}>Close</button>
                                </div>
                                
                            </Popup>
                    }
                    {isCreate && <div className="backdrop" onClick={handleClose}></div>}
                    
                </li>
                <li className="navbar-items">
                    <Link className="link" to="/profile">Profile</Link>
                </li>
            </ul>
                
            
            <ConnectButton showBalance={false}/>


        </nav>
    );
};

export default Navbar;
