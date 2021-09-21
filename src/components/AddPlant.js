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
            <label>
                <input
                    type="text"
                    value={values.nickname}
                    name="nickname"
                    onChange={inputChange}
                    placeholder="Add Nickname"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={values.species}
                    name="species"
                    onChange={inputChange}
                    placeholder="Add Species"
                />
            </label>
            <label>
                <input
                    type="text"
                    value={values.h2oFrequency}
                    name="h2oFrequency"
                    onChange={inputChange}
                    placeholder="Add H2O Frequency"
                />
            </label>
            <label>Upload Photo&nbsp;
                <input
                    type="file"
                    name="plantImg"
                    accept="image/png, image/jpeg"
                />
            </label>
            <button>Submit</button>
        </form>
    )
}