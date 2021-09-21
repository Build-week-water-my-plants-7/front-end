import React from 'react';
import { useHistory } from 'react-router-dom';

export default function AddPlant(props) {
    const { values, onChange, submit} = props;
    const history = useHistory();


    const inputChange = evt => {
        const { name, value } = evt.target;
        onChange(name, value);
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
        history.push('/myplants');
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
            <label>
                <input
                    type="text"
                    name="plantImg"
                    value={values.image}
                    onChange={inputChange}
                    placeholder="Add image url"
                />
            </label>
            <button>Submit</button>
        </form>
    )
}