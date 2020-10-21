import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import Button from "../utils/Button";

function LabelColor({ color: { color, base } }) {
  return (
    <span className={`block w-10 h-10 bg-${color}-${base} mx-1 my-1`}></span>
  );
}

function CreateLabel(props) {
  return (
    <div className="w-full p-2 text-gray-700 rounded-md shadow-lg">
      <div>
        <div className="flex items-center justify-between py-1 font-bold edit-label-header ">
          <BsChevronLeft
            className="cursor-pointer"
            onClick={() => props.labelDispatch({ type: "add-label" })}
          />
          <h3 className="text-sm text">Create Label</h3>
          <span></span>
          {/* <FaTimes /> */}
        </div>
        <hr />
        <div className="py-1 edit-label-body">
          <h4 className="text-xs font-bold">Name</h4>
          <input
            type="text"
            className="inline-block w-full px-2 py-1 border-2 rounded-sm"
          />
          <h5 className="mt-3 text-sm font-bold">Select a color</h5>
          <div className="flex flex-wrap color-wrapper ">
            {getColors().map((color) => (
              <LabelColor key={color.color + color.base} color={color} />
            ))}
          </div>
          <div className="flex justify-between mx-1 my-2 mt-6 edit-label-footer">
            <Button name="Create" color="green" base="500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function getColors() {
  return [
    {
      color: "gray",
      base: 400,
    },
    {
      color: "yellow",
      base: 400,
    },
    {
      color: "orange",
      base: 400,
    },
    {
      color: "red",
      base: 400,
    },
    {
      color: "indigo",
      base: 400,
    },
    {
      color: "blue",
      base: 400,
    },
    {
      color: "purple",
      base: 400,
    },
    {
      color: "blue",
      base: 600,
    },
    {
      color: "indigo",
      base: 600,
    },
    {
      color: "red",
      base: 600,
    },
    {
      color: "orange",
      base: 600,
    },
    {
      color: "yellow",
      base: 600,
    },
  ];
}

export default CreateLabel;
