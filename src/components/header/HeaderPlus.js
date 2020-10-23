import React, { useContext } from "react";
import { FaTimes, FaTrello } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import CreateTeamDialog from "../team/CreateTeamDialog";
import TeamContext from "../../context/TeamContext";

function HeaderPlus(props) {
  const { dispatchTeam } = useContext(TeamContext);
  return (
    <div className="relative w-full p-4 rounded shadow-lg">
      <div className="absolute top-0 right-0">
        <FaTimes
          className="m-4 cursor-pointer "
          onClick={() => props.dispatchBoard({ type: "close-plus" })}
        />
      </div>
      <h3 className="mb-2 text-center headerplus-header">Create</h3>
      <hr />
      <ul className="action-list">
        <li className="p-4 px-2 my-2 rounded hover:bg-gray-300 ">
          <Link to="/">
            <div className="flex items-center">
              <FaTrello />
              <span className="ml-2">Create board</span>
            </div>
            <p className="text-xs">
              A board is made up of cards ordered on lists. Use it to manage
              projects, track information, or organize anything.
            </p>
          </Link>
        </li>
        <li className="p-4 px-2 my-2 rounded hover:bg-gray-300 ">
          <div onClick={() => dispatchTeam({ type: "show-team" })}>
            <div className="flex items-center">
              <BsFillPeopleFill />
              <span className="ml-2">Create team</span>
            </div>
            <p className="text-xs">
              A team is a group of boards and people. Use it to organize your
              company, side hustle, family or friends.
            </p>
          </div>
          <CreateTeamDialog />
        </li>
      </ul>
    </div>
  );
}

export default HeaderPlus;
