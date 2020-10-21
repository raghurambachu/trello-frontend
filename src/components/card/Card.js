import React from "react";

function Card(props) {
  return (
    <div
      onClick={props.onClick}
      className="p-2 mb-2 bg-gray-100 rounded-md cursor-pointer card"
    >
      <p>{props.title}</p>
    </div>
  );
}

export default Card;
