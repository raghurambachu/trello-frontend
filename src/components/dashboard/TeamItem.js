import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
function TeamItem(props) {
  return (
    <li
      onClick={props.onClick}
      className={`flex items-start p-1 mt-2 mb-1 rounded-sm cursor-pointer hover:bg-gray-300 ${props.classname} `}
    >
      <BsFillPeopleFill />
      <span className="ml-3 ">{props.teamTitle}</span>
    </li>
  );
}

export default TeamItem;
