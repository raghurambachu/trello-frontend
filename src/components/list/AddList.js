import React from "react";
import { FaTimes } from "react-icons/fa";

function AddList(props) {
  return (
    <div className="transition duration-150 rounded-md add-list">
      <input
        placeholder="Enter a title for this list."
        name="add-list-content"
        id="add-list-content"
        className="block w-full p-2 border-2 outline-none"
      />
      <div className="flex items-center mt-3 add-list-footer">
        <button
          className="px-2 py-1 mr-4 text-green-100 bg-green-500 rounded-sm cursor-pointer focus:outline-none "
          onClick={() => props.setAddList(false)}
        >
          Add list
        </button>
        <FaTimes
          className="text-gray-300 cursor-pointer focus:outline-none"
          onClick={() => props.setAddList(false)}
        />
      </div>
    </div>
  );
}

export default AddList;
