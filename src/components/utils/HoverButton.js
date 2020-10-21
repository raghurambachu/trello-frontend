import React from "react";

function HoverButton(props) {
  return (
    <button className="p-2 py-1 text-blue-100 bg-blue-300 rounded-sm hover:bg-blue-400 ">
      {props.children}
    </button>
  );
}

export default HoverButton;
