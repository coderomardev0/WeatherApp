import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/applicationContext";
import LOGO from "../../images/weatherAppLogo.svg";

const Header = (props) => {
  const appContext = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    appContext.logout();
  };

  return (
    <div>
      {" "}
      <header className="sticky top-0 z-50">
        <nav className="flex items-center justify-between flex-wrap bg-indigo-800 bg-opacity-40 p-6 border-b border-indigo-700 shadow-lg">
          <div className="block lg:hidden">
            <button
              className="flex items-center px-4 py-3 border rounded text-white hover:text-white hover:border-white max-[375px]:"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <img
            alt="WeatherApp Logo"
            // className="float-left sm:w-3/6"
            className="float-left xs large:w-1/6 h-1/6"
            // className="float-left min-[320px]:w-3/6 h-3/6 max-[1000px]: w-1/6 h-1/6"
            src={LOGO}
          />
          <div className="clear-both"></div>
          <div
            className={`w-full ${
              showMenu ? "hidden" : "block"
            } lg:flex lg:items-center lg:w-auto`}
          >
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <Link
                className="inline-block no-underline hover:text-gray-300 font-bold text-lg py-2 px-4 lg:-ml-2"
                to="/"
              >
                Welcome to Weather App
              </Link>
            </div>
            <div className="text-sm lg:flex-grow">
              <Link
                className="block mt-4 lg:inline-block lg:mt-0 font-bold text-white hover:text-gray-300  text-lg py-2 px-4 lg:-ml-2"
                to="/currentWeatherData"
              >
                Live Weather Data
              </Link>
              <Link
                className="block mt-4 lg:inline-block lg:mt-0 font-bold text-white hover:text-gray-300  text-lg py-2 px-4 lg:-ml-2"
                to="/historyWeatherData"
              >
                History Weather Data
              </Link>
            </div>
            <div>
              <Link to="/login">
                <div
                  className="inline-block no-underline text-white hover:text-gray-300  font-bold text-lg py-2 px-4 rounded"
                  onClick={() => logout()}
                >
                  Logout
                </div>
              </Link>
            </div>
          </div>
        </nav>
        <main className="w-screen relative">{props.children}</main>
      </header>
    </div>
  );
};

export default Header;
