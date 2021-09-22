import React from 'react';
import ReactDom from 'react-dom';
import { useHistory } from 'react-router-dom';

export default function EditPlantModal(props) {
    const { values, onChange, submit } = props;

    const history = useHistory();

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
        history.push("/myplants");
    };

    return ReactDom.createPortal
    (<div className="ui dimmer modals visible active">
        <div className="ui standard modal visible active">
            <form onSubmit={onSubmit}>
                <label>
                    <input
                        type="text"
                        value={values.nickname}
                        name="nickname"
                        onChange={onChange}
                        placeholder="Add Nickname"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={values.species}
                        name="species"
                        onChange={onChange}
                        placeholder="Add Species"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={values.h2oFrequency}
                        name="h2oFrequency"
                        onChange={onChange}
                        placeholder="Add H2O Frequency"
                    />
                </label>
                <label>
                    <input
                        type="text"
                        value={values.image}
                        name="plantImg"
                        onChange={onChange}
                        placeholder="Add image url"
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    </div>, 
document.querySelector("#modal"));
}