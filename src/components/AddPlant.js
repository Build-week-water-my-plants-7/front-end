import React from 'react';

export default function AddPlant(props) {
    const { values, onChange, onSubmit} = props;

    const inputChange = evt => {
        const { name, value } = evt.target;
        onChange(name, value);
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Nickname&nbsp;
                <input
                    type="text"
                    value={values.nickname}
                    name="nickname"
                    onChange={inputChange}
                />
            </label>
            <label>Species&nbsp;
                <input
                    type="text"
                    value={values.species}
                    name="species"
                    onChange={inputChange}
                />
            </label>
        </form>
    )
}