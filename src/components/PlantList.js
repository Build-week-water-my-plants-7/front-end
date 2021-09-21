import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Plant from './Plant';
import AddPlant from './AddPlant';
import axios from 'axios';

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
        axios.get('https://bwwatermyplants7.herokuapp.com/api/plants')
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
                setPlantList({...plantList, res});
                setFormValues(initialFormValues);
            })
            .catch(err => console.error(err));
    }


    const history = useHistory();

    const routeToForm = () => {
        history.push("/addplant");
    }


    const editPlant = (id) => {
        const plant = plantList.find(item => item.id === id);
        setFormValues({ ...plant });
    }

	
	return (
		<div>
            <h1>Your Plants</h1>
            <ul>
                {plantList.map(item => (
                    <li key={item.id}>
                        <Plant nickname={item.nickname} species={item.species} h2oFrequency={item.h2oFrequency} />
                        <button onClick={() => editPlant(item.id)}>Edit</button>
                    </li>
                ))}
            </ul>
            <button onClick={routeToForm}>Add</button>
            <Route path="/addplant">
                <AddPlant values={formValues} onChange={onChange} submit={onSubmit} />
            </Route>
		</div>
	)
}