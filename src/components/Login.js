import React, { useState } from "react";
import axios from "axios";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";

export default function Login(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { setIsLoggingIn } = props;

  let history = useHistory();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    console.log("CREDENTIALS", credentials)
    axios
      .post("https://bwwatermyplants7.herokuapp.com/api/login", credentials)
      .then((res) => {
        console.log("SUCCESSFUL LOGIN RESPONSE", res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user_id);
        history.push("/myplants")

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
            Sign in to your account, bruh
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
                value={credentials.username}
                onChange={handleChange}
                autoComplete="username"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Username"
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
                value={credentials.password}
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
                  className="w-5 h-5 text-green-500 group-hover:text-green-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
          <div>
            <button
              type="cancel"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-black bg-white border border-transparent rounded-md group hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => setIsLoggingIn(false)}
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
