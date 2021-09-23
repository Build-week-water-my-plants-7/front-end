import React, { useState, useEffect, Fragment } from "react";
import { Route, useHistory } from "react-router-dom";
import AddPlant from "./AddPlant";
import axios from "axios";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon, PlusIcon } from "@heroicons/react/outline";

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
  image: "",
};

// dasboard UI------------
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// dasboard UI----------------------

export default function PlantList() {
  const [plantList, setPlantList] = useState(initialPlants);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    axios
      .get("https://bwwatermyplants7.herokuapp.com/api/plants/user/id")
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
      nickname: formValues.nickname,
      species: formValues.species,
      h2oFrequency: formValues.h2oFrequency
    };
    axios
      .post("https://bwwatermyplants7.herokuapp.com/api/plants/addplant", newPlant)
      .then((res) => {
        console.log(res);
        setPlantList({ ...plantList, res });
        setFormValues(initialFormValues);
      })
      .catch(err => console.error(err))
  };

  const history = useHistory();

  const routeToForm = () => {
    history.push("/myplants/addplant");
  };

  const submitEdit = (id) => {
    const updatedPlant = {
      nickname: formValues.nickname,
      species: formValues.species,
      h2oFrequency: formValues.h2oFrequency
    }
    axios.put(`https://bwwatermyplants7.herokuapp.com/api/plants/${id}`, updatedPlant)
      .then(res => {
        setPlantList({ ...plantList, res });
        setFormValues(initialFormValues);
      })
      .catch(err => console.error(err))
  }

  const deletePlant = (id) => {
    axios.delete(`https://bwwatermyplants7.herokuapp.com/api/plants/${id}`)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.error(err));
    axios.get("https://bwwatermyplants7.herokuapp.com/api/plants/user/id")
    .then(res => {
      setPlantList(res.data)
    })
    .catch(err => console.error(err))
  }

  const buttonTest = () => {
    console.log('click');
  }

  /*const editPlant = (id) => {
      const plant = plantList.find((item) => item.plant_id === id);
      setFormValues({ ...plant });
    };*/

  return (
    <div>
      <Disclosure as="nav" className="bg-green-600">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-white.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-green-800 text-white"
                              : "text-white hover:bg-white hover:text-green-600",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg leading-6 font-semibold text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content goes here */}

          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg">
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
                            alt={plant.nickname}
                            className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                          />
                        </div>
                        <div className="flex-1 p-4 space-y-2 flex flex-col">
                          <h3 className="text-sm font-medium text-gray-900">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {plant.nickname}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {plant.species}
                          </p>
                          <div className="flex-1 flex flex-col justify-end">
                            <p className="text-base font-medium text-gray-900">
                              {plant.h2oFrequency}
                            </p>
                          </div>
                        </div>
                        <button onClick={() => buttonTest}>Edit</button>
                        <button onClick={() => deletePlant(plant.plant_id)}>Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gray-100 rounded-lg py-8">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">
                    Add to your plant collection.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={routeToForm}
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <PlusIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      New Plant
                    </button>
                  </div>
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
          </main>
        </div>
      </div>
    </div>
  );
}
