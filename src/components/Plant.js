import React from 'react';
import Link from 'react-router-dom';

export default function Plant(props) {
    const { nickname, species, h2oFrequency } = props;
    return (
        <div>
            <Link to="/editplants">
                <h2>{nickname}</h2>
                <h4>{species}</h4>
                <p>{h2oFrequency}</p>
            </Link>
        </div>
    )
}