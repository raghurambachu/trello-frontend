import React from "react";
import { FiEdit2 } from "react-icons/fi";

function Label(props) {
  return (
    <li className="flex items-center space-x-2 hover:border-l-4 ">
      <div
        className={`w-11/12 p-2 py-4 bg-${props.labelColor}-${
          props.base
        } relative cursor-pointer rounded-md hover:bg-${props.labelColor}-${
          props.base + 100
        } hover:border-gray-500 border-l-6  `}
      >
        <p className="absolute top-0">{props.labelTitle}</p>
      </div>
      <FiEdit2 className="cursor-pointer" />
    </li>
  );
}

export default Label;
