import React  from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import header from '../../images/header.png';
import logo from '../../images/icons/logo.png';
import { useAuth } from '../../Context/AuthContext';

const Header = () => {


    const {loggedInUser, logOut} = useAuth()

    const handleLogout = () => {
        localStorage.removeItem('token')
        logOut();
    }
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})` }} className="header">
            <nav className="nav navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><img className="logo" src={logo} alt=""/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link btn-book" to="/bookings">Bookings</Link>
                            </li>
                            {
                                !loggedInUser &&
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            }          
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {   loggedInUser?.email &&
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link">{loggedInUser?.email}</span>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-warning" onClick={handleLogout}>Log Out</button>
                                    </li>
                                </>
                            } 
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="title-container">
                <h1>Burj Al Arab</h1>
                <h2>A global icon of Arabian luxury</h2>
            </div>
        </div>
    );
};

export default Header;