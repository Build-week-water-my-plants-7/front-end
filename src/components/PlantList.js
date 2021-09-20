import React, { useState, useEffect } from 'react';
import Link from 'react-router-dom';

const initialPlants = [];

export default function PlantList() {
    const [plantList, setPlantList] = useState(initialPlants);

    useEffect(() => {
        axios.get('')
            .then(res => {
                console.log(res);
                /*setPlantList(res);*/
            })
            .catch(err => console.error(err));
    })
	
	return (
		<div>
            <h1>Your Plants</h1>
            {plantList.map(item => {
                return (
                    <Plant nickname={item.nickname} species={item.species} h2oFrequency={item.h2oFrequency} />
                )
            })}
            <Link to="/addplant">Add</Link>
		</div>
	)
}