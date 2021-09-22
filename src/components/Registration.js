import React, { useState } from "react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/solid";

export default function Registration(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    phone: "",
  });

  const { setIsRegistering } = props;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    axios
      .post("https://bwwatermyplants7.herokuapp.com/api/register", user)
      .then((res) => {
        console.log("SUCCESSFUL REGSITRATION RESPONSE", res.data);
        localStorage.setItem("token");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          {/* <img
            className="w-auto h-12 mx-auto"
            src="https://i.gifer.com/7fhd.gif"
            alt="Workflow"
          /> */}
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Make and account, ser
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={login}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={user.username}
                onChange={handleChange}
                autoComplete="username"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={user.phone}
                onChange={handleChange}
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md group hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="w-5 h-5 text-green-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Submit
            </button>
          </div>
          <div>
            <button
              type="cancel"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-black bg-white border border-transparent rounded-md group hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => setIsRegistering(false)}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {/* <LockClosedIcon className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
              </span>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
