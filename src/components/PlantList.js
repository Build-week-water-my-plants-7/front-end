import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Plant from './Plant';
import AddPlant from './AddPlant';
import axios from 'axios';

const initialPlants = [
    {
      plant_id: 1,
      nickname: "Barley",
      species: "Hordeum vulgare",
      h2oFrequency: "1",
      image: "https://i.imgur.com/DZYDS4l.jpg",
    },
    {
      plant_id: 2,
      nickname: "Almond blossom",
      species: "Prunus amygdalus",
      h2oFrequency: "2",
      image: "https://i.imgur.com/6A3WI8E.jpg",
    },
    {
      plant_id: 3,
      nickname: "Swan River daisy",
      species: "Brachyscome iberidifolia",
      h2oFrequency: "1",
      image: "https://i.imgur.com/frK0IWh.jpg",
    },
    {
      plant_id: 4,
      nickname: "Clarkes geranium",
      species: "Geranium clarkei",
      h2oFrequency: "1",
      image: "https://i.imgur.com/orqT9BJ.jpg",
    },
    {
      plant_id: 5,
      nickname: "Oriental lily",
      species: "Lilium orientalis",
      h2oFrequency: "1",
      image: "https://i.imgur.com/4LUuvOy.jpg",
    },
    {
      plant_id: 6,
      nickname: "Monstera",
      species: "Monstera deliciosa",
      h2oFrequency: "1",
      image: "https://i.imgur.com/DQvcUDZ.jpg",
    },
  ];

  const initialFormValues = {
    nickname: "",
    species: "",
    h2oFrequency: "",
    image: ""
  };
  
  export default function PlantList() {
    const [plantList, setPlantList] = useState(initialPlants);
    const [formValues, setFormValues] = useState(initialFormValues);
  
    useEffect(() => {
      axios
        .get("https://bwwatermyplants7.herokuapp.com/api/plants")
        .then((res) => {
          console.log(res);
          /*setPlantList(res);*/
        })
        .catch((err) => console.error(err));
    });
  
    const onChange = (name, value) => {
      setFormValues({ ...formValues, [name]: value });
    };
  
    const onSubmit = () => {
      const newPlant = {
        nickname: formValues.name,
        species: formValues.species,
        h2oFrequency: formValues.h2oFrequency,
      };
      axios
        .post("", newPlant)
        .then((res) => {
          console.log(res);
          setPlantList({ ...plantList, res });
          setFormValues(initialFormValues);
        })
        .catch((err) => console.error(err));
    };
  
    const history = useHistory();
  
    const routeToForm = () => {
      history.push("/myplants/addplant");
    };
  
    const editPlant = (id) => {
      const plant = plantList.find((item) => item.plant_id === id);
      setFormValues({ ...plant });
    };
  
    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Plants</h2>
  
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {plantList.map((plant) => (
              <div
                key={plant.plant_id}
                className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
              >
                <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                  <img
                    src={plant.image}
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                  />
                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {plant.nickname}
                  </h3>
                  <p className="text-sm text-gray-500">{plant.species}</p>
                  <div className="flex-1 flex flex-col justify-end">
                    <p className="text-base font-medium text-gray-900">
                      {plant.h2oFrequency}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={routeToForm}>Add</button>
            <Route path="/myplants/addplant">
              <AddPlant
                values={formValues}
                onChange={onChange}
                submit={onSubmit}
              />
            </Route>
          </div>
        </div>
      </div>
    );
  }