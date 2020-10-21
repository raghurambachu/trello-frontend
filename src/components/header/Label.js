import React from "react";

function Lable(props) {
  return (
    <li className={`label inline-block py-1 px-2 ${props.background}`}>
      {props.title}
    </li>
  );
}

export default Lable;
