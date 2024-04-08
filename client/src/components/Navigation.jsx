import {logo} from "../constants/main.js";
import "./style.scss"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const Navigation = ({ active, setActive }) => {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.id);
    };


    const handleActive = (e) => {
        setActive(e);
        console.log(e);
    }

    const handleClose = () => {
        const closeAlert = window.confirm("Are you sure you want to close the popup?");
        closeAlert &&  setActive('');
    };
    return (
        

        <Navbar expand="lg" className="sticky-top">
            <Container>
            <Navbar.Brand href="/" onClick={() => { handleActive('home')}}>
                <img
                    src={logo} // Replace with the path to your logo
                    width="100"
                    height="100"
                    className="d-inline-block align-top"
                    alt="Uruk logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle className="wrap-toggle" aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse  className="basic-navbar-nav">
                <Nav className="d-flex justify-content-around flex-grow-1 pl-100">
                    <Nav.Link id="community" className="text-decoration-none text-white" href="/community" onClick={() => handleActive('community')}>Community</Nav.Link>
                    <Nav.Link id="create" className="text-decoration-none text-white"  onClick={() => handleActive('create')}>Create</Nav.Link>
                    <Modal centered show={active === 'create'} onHide={handleClose}>
  
                        <Modal.Body>
                            {/* <button type="button" className="btn border-none border-decoration-none " onClick={handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                            <textarea  id={text} onChange={handleChange} cols="40" rows="10"></textarea>
                        </Modal.Body>
                    </Modal>
                    <Nav.Link id="profile" className="text-decoration-none text-white" href="/profile" onClick={() => handleActive('profile')}>Profile</Nav.Link>
                    <ConnectButton showBalance={false}/>
                </Nav>
            </Navbar.Collapse>

                
            

            </Container>
                     

        </Navbar>
    );
};

export default Navigation;
