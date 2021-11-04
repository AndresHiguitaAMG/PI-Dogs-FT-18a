import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="navBarContainer">
            <NavLink to="/home">
                    Home
            </NavLink>

            <NavLink to="/home/create">
            Create a new breed 
            </NavLink>   
        </div>
    ); 
} 

export default NavBar
