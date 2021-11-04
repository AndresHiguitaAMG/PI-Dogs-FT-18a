import React from 'react';
import { NavLink } from 'react-router-dom';

const Cards = ({ image, name, temperament, id }) => {
    return (
        <div>
            <div>
                <img src={image} alt="img not found" width="200px" heigth="250px" />
            </div>

            <div>
                <NavLink to={`/detail/${id}`}>
                    {name}
                </NavLink>
                
                <h3>{temperament}</h3>
            </div>
        </div>
    )
}

export default Cards;
