import React from "react";

function AddMember() {
  return (
    <div className="w-full p-2 text-gray-700 rounded-md shadow-lg add-member">
      <h3 className="mb-2 font-semibold text-center headerplus-header">
        Members
      </h3>
      <hr />
      <div className="mt-2">
        <input
          type="text"
          className="block w-full p-1 my-2 border border-gray-700"
          placeholder="add member  "
        />
      </div>
      <h4 className="text-sm font-bold">Board members</h4>
    </div>
  );
}

export default AddMember;
