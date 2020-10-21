import React from "react";
import Label from "./Label";

function LightButton(props) {
  return (
    <button className="w-full py-2 my-3 text-sm bg-gray-300 rounded-sm hover:bg-gray-400">
      {props.children}
    </button>
  );
}

function AddLabel(props) {
  return (
    <div className="w-full p-2 text-gray-800 rounded-md shadow-lg">
      <h3 className="text-lg text-center">Labels</h3>
      <hr />
      <input
        type="text"
        className="inline-block w-full px-2 py-1 my-2 border-2 rounded-md"
        placeholder="Search labels..."
      />
      <div>
        <h4 className="text-sm font-bold uppercase">Labels</h4>
        <ul className="flex flex-col space-y-1">
          <Label labelColor={"green"} base={400} />
          <Label labelColor={"yellow"} base={400} />
          <Label labelColor={"orange"} base={400} />
          <Label labelColor={"red"} base={400} />
          <Label labelColor={"blue"} base={400} />
          <Label labelColor={"indigo"} base={400} />
        </ul>
        <LightButton>
          <span
            className="block"
            onClick={() => props.labelDispatch({ type: "create-label" })}
          >
            Create a new label
          </span>
        </LightButton>
        <hr />
        <LightButton>Enable color blind friendly mode</LightButton>
      </div>
    </div>
  );
}

export default AddLabel;
