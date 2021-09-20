import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

const initialPlants = [];

const initialFormValues = {
    nickname: '',
    species: '',
    h2oFrequency: ''
}

export default function PlantList() {
    const [plantList, setPlantList] = useState(initialPlants);
    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
        axios.get('')
            .then(res => {
                console.log(res);
                /*setPlantList(res);*/
            })
            .catch(err => console.error(err));
    })

    const onChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value});
    }

    const onSubmit = () => {
        const newPlant = {
            nickname: formValues.name,
            species: formValues.species,
            h2oFrequency: formValues.h2oFrequency
        }
        axios.post('', newPlant)
            .then(res => {
                console.log(res);
                setPlantList(res);
                setFormValues(initialFormValues);
            })
            .catch(err => console.error(err));
    }

    const history = useHistory();

    const routeToForm = () => {
        history.push("/addplant");
    }
	
	return (
		<div>
            <h1>Your Plants</h1>
            {plantList.map(item => {
                return (
                    <Plant nickname={item.nickname} species={item.species} h2oFrequency={item.h2oFrequency} />
                )
            })}
            <button onClick={routeToForm}>Add</button>
            <Route path="/addplant">
                <AddPlant />
            </Route>
		</div>
	)
}