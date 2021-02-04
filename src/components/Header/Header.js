import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './Header.css';
import header from '../../images/header.png';
import logo from '../../images/icons/logo.png';
import axios from 'axios';
import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {
    const history = useHistory()
    const getUser = localStorage.getItem('loggedIn')
    const [user, setUser] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/users/?token=' + getUser)
            .then((response) => response.data)
            .then(data => {
                console.log(data)
                setUser(data)
            })
    }, [])
    const handleLog = () => {
        localStorage.clear()
        setTimeout(function(){ window.location.reload() }, 2000);
    }
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})` }} className="header">
            <header className="container px-5">
                <Navbar expand="lg">
                    <div className='mr-5 mb-4'>
                        <Link to='/' className='text-decoration-none'><img style={{width:'100px'}} src={logo} alt=""/></Link>
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink className="text-decoration-none font-weight-bold text-white mx-3 my-4" to="/" style={{ fontSize: '17px', fontWeight: 'bold' }}>Home</NavLink>
                            <NavLink className="text-decoration-none font-weight-bold text-white mx-3 my-4" to='/' style={{ fontSize: '17px', fontWeight: 'bold' }}>About</NavLink>
                            <NavLink className="text-decoration-none font-weight-bold text-white mx-3 my-4" to="/" style={{ fontSize: '17px', fontWeight: 'bold' }}>Contact us</NavLink>
                            {localStorage.getItem('loggedIn')?
                                <>
                                <NavLink className="text-decoration-none font-weight-bold text-white mx-3 my-4" to="/booked" style={{ fontSize: '17px', fontWeight: 'bold' }}>Room Booked</NavLink>
                                    <div className="text-decoration-none font-weight-bold text-white mx-3 my-4" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                                        HOWDY, {
                                            user.map(x => x.values.name)
                                        }
                                    </div>
                                    <button className='btn btn-warning px-5 mb-5 mt-3' style={{ fontSize: '17px', fontWeight: 'bold', borderRadius: '30px' }} onClick={handleLog}>Logout</button>
                                </>
                                : <>
                                    <button className='btn btn-warning px-5 mb-5 mt-3' style={{ fontSize: '17px', fontWeight: 'bold', borderRadius: '20px' }} onClick={() => history.push('/login')}>Login</button>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <div className="title-container">
                <h1>Burj Al Arab</h1>
                <h2>A global icon of Arabian luxury</h2>
            </div>
        </div>
    );
};

export default Header;