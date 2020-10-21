import React from "react";
import { FaTrello } from "react-icons/fa";
import { Link } from "react-router-dom";

function HeaderBeforeLogin() {
  return (
    <header className="fixed px-12 py-2 top-0 left-0 right-0 bg-blue-500">
      <nav className=" flex justify-between items-center">
        <h2 className="text-4xl flex items-center">
          <FaTrello size={40} color="white" />
          <span className="text-blue-100 ml-3"> Trello</span>
        </h2>
        <ul className="flex space-x-8">
          <li>
            <Link className="text-lg text-blue-100 hover:underline ">
              Log In
            </Link>
          </li>
          <li>
            <Link className="text-lg text-blue-500 bg-blue-100 px-5 rounded-sm font-bold py-2 ">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderBeforeLogin;
