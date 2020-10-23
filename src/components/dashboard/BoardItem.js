import React from "react";

function BoardItem(props) {
  return (
    <div
      className={`flex items-center justify-center w-48 h-24 ${
        props.className ? props.className : "bg-gray-300"
      } rounded-sm cursor-pointer hover:bg-gray-400 `}
    >
      <p>{props.name}</p>
    </div>
  );
}

export default BoardItem;
