import React from "react";

function CreateBoard() {
  return (
    <div className="w-full p-4 text-gray-700 rounded shadow-lg create-board sm:w-1/2 md:w-1/4">
      <input type="text" placeholder="Add board title" className="block" />
      <select name="team">
        <option value="altcampusians">altcampusians</option>
      </select>
    </div>
  );
}

export default CreateBoard;
