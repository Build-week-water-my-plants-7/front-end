import React from 'react';

export default function AddPlant(props) {
    const { values, onChange, submit} = props;

    const inputChange = evt => {
        const { name, value } = evt.target;
        onChange(name, value);
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
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
            <label>H2O Frequency&nbsp;
                <input
                    type="text"
                    value={values.h2oFrequency}
                    name="h2oFrequency"
                    onChange={inputChange}
                />
            </label>
            <button>Submit</button>
        </form>
    )
}