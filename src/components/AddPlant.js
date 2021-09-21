import React from "react";
import { useHistory } from "react-router-dom";

export default function AddPlant(props) {
  const { values, onChange, submit } = props;
  const history = useHistory();

  const inputChange = (evt) => {
    const { name, value } = evt.target;
    onChange(name, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
    history.push("/myplants");
  };

  return (
    <>
      <div className="hidden sm:block bg-gray-100" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0 bg-gray-100 ">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Add Plant
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Fill out the form to add your plant to the collection
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={onSubmit}>
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
                        value={values.nickname}
                        name="nickname"
                        onChange={inputChange}
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
                        value={values.species}
                        name="species"
                        onChange={inputChange}
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
                        value={values.h2oFrequency}
                        name="h2oFrequency"
                        onChange={inputChange}
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
                        name="plantImg"
                        value={values.image}
                        onChange={inputChange}
                        placeholder="Add image url"
                        className="mt-1 w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
