import React, { useState, useEffect, Fragment } from "react";
import { Route, useHistory } from "react-router-dom";
import AddPlant from "./AddPlant";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon, PlusIcon } from "@heroicons/react/outline";

const initialFormValues = {
  nickname: "",
  species: "",
  h2oFrequency: "",
  image: "",
};

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [{ name: "Your Profile", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const userId = localStorage.getItem("user_id");

export default function PlantList() {
  const [plantList, setPlantList] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    axiosWithAuth()
      .get(`/plants/user/${userId}`)
      .then((res) => {
        setPlantList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const onChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = () => {
    const newPlant = {
      user_id: userId,
      nickname: formValues.nickname,
      species: formValues.species,
      h2oFrequency: formValues.h2oFrequency,
      image: formValues.image,
    };
    axiosWithAuth()
      .post("/addplant", newPlant)
      .then((res) => {
        setPlantList([...plantList, res]);
        setFormValues(initialFormValues);
      })
      .catch((err) => console.error(err));
  };

  const history = useHistory();

  const routeToForm = () => {
    history.push("/myplants/addplant");
  };

  const submitEdit = (evt, id) => {
    evt.preventDefault();
    const updatedPlant = {
      user_id: userId,
      nickname: formValues.nickname,
      species: formValues.species,
      h2oFrequency: formValues.h2oFrequency,
      image: formValues.image,
    };
    axiosWithAuth()
      .put(`/plants/${id}`, updatedPlant)
      .then((res) => {
        setPlantList([...plantList, res]);
        setFormValues(initialFormValues);
      })
      .catch((err) => console.error(err));
  };

  // const editPlantModal = (
  //   <StyledModal className="modal">
  //     <div className="hidden sm:block bg-gray-100" aria-hidden="true">
  //       <div className="py-5">
  //         <div className="border-t border-gray-200" />
  //       </div>
  //     </div>

  //     <div className="mt-10 sm:mt-0 bg-gray-100 ">
  //       <div className="md:grid md:grid-cols-3 md:gap-6">
  //         <div className="md:col-span-1">
  //           <div className="px-4 sm:px-0">
  //             <h3 className="text-lg font-medium leading-6 text-gray-900">
  //               Edit Plant
  //             </h3>
  //             <p className="mt-1 text-sm text-gray-600">
  //               Fill out the form to edit the selected plant
  //             </p>
  //           </div>
  //         </div>
  //         <div className="mt-5 md:mt-0 md:col-span-2">
  //           <form action="#" method="POST" onSubmit={submitEdit}>
  //             <div className="shadow overflow-hidden sm:rounded-md">
  //               <div className="px-4 py-5 bg-white sm:p-6">
  //                 <div className="grid grid-cols-6 gap-6">
  //                   <div className="col-span-6 sm:col-span-3">
  //                     <label
  //                       htmlFor="first-name"
  //                       className="block text-sm font-medium text-gray-700"
  //                     >
  //                       Nickname
  //                     </label>
  //                     <input
  //                       type="text"
  //                       value={formValues.nickname}
  //                       name="nickname"
  //                       onChange={onChange}
  //                       placeholder="Add Nickname"
  //                       className="mt-1 focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-black rounded-md"
  //                     />
  //                   </div>

  //                   <div className="col-span-6 sm:col-span-3">
  //                     <label
  //                       htmlFor="species"
  //                       className="block text-sm font-medium text-gray-700"
  //                     >
  //                       Species
  //                     </label>
  //                     <input
  //                       type="text"
  //                       value={formValues.species}
  //                       name="species"
  //                       onChange={onChange}
  //                       placeholder="Add Species"
  //                       className="mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block"
  //                     />
  //                   </div>
  //                   <div className="col-span-6 sm:col-span-3">
  //                     <label
  //                       htmlFor="water"
  //                       className="block text-sm font-medium text-gray-700"
  //                     >
  //                       Water Frequency
  //                     </label>
  //                     <input
  //                       type="text"
  //                       value={formValues.h2oFrequency}
  //                       name="h2oFrequency"
  //                       onChange={onChange}
  //                       placeholder="Add H2O Frequency"
  //                       className="mt-1 focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-black rounded-md"
  //                     />
  //                   </div>

  //                   <div className="col-span-6 sm:col-span-3">
  //                     <label
  //                       htmlFor="image-url"
  //                       className="block text-sm font-medium text-gray-700"
  //                     >
  //                       Image URL
  //                     </label>
  //                     <input
  //                       type="text"
  //                       name="image"
  //                       value={formValues.image}
  //                       onChange={onChange}
  //                       placeholder="Add image url"
  //                       className="mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block"
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
  //                 <button
  //                   type="submit"
  //                   className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //                 >
  //                   Save
  //                 </button>
  //               </div>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </StyledModal>
  // );

  const deletePlant = (id) => {
    axiosWithAuth()
      .delete(`/plants/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
    axiosWithAuth()
      .get(`/plants/user/${userId}`)
      .then((res) => {
        setPlantList(res.data);
      })
      .catch((err) => console.error(err));
  };

  // const buttonTest = () => {
  //   console.log("click");
  // };

  /*const editPlant = (id) => {
      const plant = plantList.find((item) => item.plant_id === id);
      setFormValues({ ...plant });
    };*/
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="mt-10 sm:mt-0 bg-gray-100 ">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Edit Plant
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Fill out the form to edit the selected plant
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST" onSubmit={submitEdit}>
                      <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Nickname
                              </label>
                              <input
                                type="text"
                                value={formValues.nickname}
                                name="nickname"
                                onChange={onChange}
                                placeholder="Add Nickname"
                                className="mt-1 focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-black rounded-md"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="species"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Species
                              </label>
                              <input
                                type="text"
                                value={formValues.species}
                                name="species"
                                onChange={onChange}
                                placeholder="Add Species"
                                className="mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block"
                              />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="water"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Water Frequency
                              </label>
                              <input
                                type="text"
                                value={formValues.h2oFrequency}
                                name="h2oFrequency"
                                onChange={onChange}
                                placeholder="Add H2O Frequency"
                                className="mt-1 focus:ring-indigo-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-black rounded-md"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="image-url"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Image URL
                              </label>
                              <input
                                type="text"
                                name="image"
                                value={formValues.image}
                                onChange={onChange}
                                placeholder="Add image url"
                                className="mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
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
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
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
                          <h3 className="text-lg font-medium text-gray-900">
                            {/* <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            /> */}
                            {plant.nickname}
                          </h3>
                          <p className="text-md text-gray-500 italic">
                            {plant.species}
                          </p>
                          <div className="flex-1 flex flex-col justify-end">
                            <p className="text-sm font-medium text-gray-900">
                              Water {plant.h2oFrequency}x/day
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setOpen(true)}
                          className="inline-flex items-center mb-4 mx-24 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePlant(plant.plant_id)}
                          className="inline-flex items-center mb-4 mx-24 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Delete
                        </button>
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
