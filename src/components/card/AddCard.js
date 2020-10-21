import React from "react";
import { FaTimes } from "react-icons/fa";

function AddCard(props) {
  return (
    <div className="add-card">
      <textarea
        placeholder="Enter a title for this card."
        name="add-card-content"
        id="add-card-content"
        className="block w-full h-16 p-2 border-2 outline-none resize-none"
      ></textarea>
      <div className="flex items-center mt-3 add-card-footer">
        <button
          className="px-2 py-1 mr-4 text-green-100 bg-green-500 rounded-sm cursor-pointer focus:outline-none "
          onClick={() => props.dispatch({ type: "save-card" })}
        >
          Add Card
        </button>
        <FaTimes
          className="cursor-pointer focus:outline-none"
          onClick={() => props.dispatch({ type: "close-card" })}
        />
      </div>
    </div>
  );
}

export default AddCard;
