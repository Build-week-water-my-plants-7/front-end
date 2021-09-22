import "../App.css";
// import { Fragment } from "react";
import {
  Popover,
  // Transition
} from "@headlessui/react";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

import Login from "./Login";
import Registration from "./Registration";

// const navigation = [
//   { name: "Test", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];

function HomePage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gray-50">
      {!(isRegistering || isLoggingIn) && (
        <div className="relative pt-6 pb-16 sm:pb-24">
          <Popover>
            <div className="px-4 mx-auto max-w-7xl sm:px-6">
              <nav
                className="relative flex items-center justify-between sm:h-10 md:justify-center"
                aria-label="Global"
              >
                <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <button href="#">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="w-auto h-8 sm:h-10"
                        src="https://i.gifer.com/7fhd.gif"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </Popover>

          <main className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Water your f'n Plants</span>{" "}
                <span className="block text-green-600 xl:inline">, bruh</span>
              </h1>
              <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Create plant profiles and remind yourself to water them.
              </p>

              <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <button
                    href="#"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                    onClick={() => setIsLoggingIn(true)}
                  >
                    Sign In
                  </button>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <button
                    href="#"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-green-600 bg-white border border-transparent rounded-md hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    onClick={() => setIsRegistering(true)}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </main>
          {/* <Login /> */}
        </div>
      )}
      {isLoggingIn && <Login setIsLoggingIn={setIsLoggingIn} />}
      {isRegistering && <Registration setIsRegistering={setIsRegistering} />}
    </div>
  );
}

export default HomePage;
