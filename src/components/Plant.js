import React from 'react';

export default function Plant(props) {
    const { nickname, species, h2oFrequency } = props;
    return (
        <div>
                <h2>{nickname}</h2>
                <h4>{species}</h4>
                <p>{h2oFrequency}</p>
        </div>
    )
}