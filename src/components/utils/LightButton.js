import React from "react";

function LightButton(props) {
  return (
    <button className="w-full py-2 my-3 text-sm bg-gray-300 rounded-sm hover:bg-gray-400">
      {props.children}
    </button>
  );
}

export default LightButton;
