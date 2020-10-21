import React from "react";
import { FaTimes } from "react-icons/fa";

function AddBoard(props) {
  return (
    <div className="add-board">
      <div className="relative">
        <button
          className="absolute top-0 right-0 focus:outline-none"
          onClick={props.close}
        >
          <FaTimes />
        </button>
        <form className="p-3 pt-8">
          <input
            className="block w-full px-2 py-1 border-2 border-gray-800 rounded-sm"
            type="text"
            placeholder="Add board title"
          />
          <div className="flex justify-between ">
            <select name="select-team" className="p-2 my-4">
              <option value="altcampusians">Altcampusians</option>
              <option value="lifehacker">Lifehacker</option>
              <option value="Samrat">Samrat</option>
            </select>
            <button className="self-center px-3 py-2 text-blue-100 bg-blue-400 rounded-sm ">
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBoard;
