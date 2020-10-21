import React from "react";

function Button(props) {
  return (
    <button
      className={`px-4 py-1 rounded-sm text-${props.color}-${
        props.base - 300
      } text-sm font-bold focus:outline-none bg-${props.color}-${props.base}`}
    >
      {props.name}
    </button>
  );
}

export default Button;
