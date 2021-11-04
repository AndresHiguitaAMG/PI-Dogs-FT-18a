import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';


const LandingPage = () => {
    return (
        <div className="container">
            <NavLink to="/home">
                <img className="logo" src="https://st3.depositphotos.com/4265001/14374/v/600/depositphotos_143741679-stock-illustration-dog-logo-illustration.jpg" alt="to home" />
                <h1>Welcome</h1>
            </NavLink>
        </div>
    )
}

export default LandingPage;
