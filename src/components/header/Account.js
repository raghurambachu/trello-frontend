import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

function Account(props) {
  return (
    <div className="relative w-full p-4 text-gray-700 rounded shadow-lg">
      <div className="absolute top-0 right-0">
        <FaTimes
          onClick={() => props.dispatchBoard({ type: "close-account" })}
          className="m-4 cursor-pointer"
        />
      </div>
      <h3 className="mb-2 text-center headerplus-header">Account</h3>
      <hr />
      <div className="flex items-center my-4">
        <BsPersonFill size={30} />
        <div className="ml-4">
          <h3>Raghuram Bachu</h3>
          <p>1993raghuram@gmail.com</p>
        </div>
      </div>
      <hr />
      <ul className="">
        <li className="px-2 py-1 my-2 rounded hover:bg-gray-300">Profile</li>
        <li className="px-2 py-1 my-2 rounded hover:bg-gray-300">Logout</li>
      </ul>
    </div>
  );
}

export default Account;
