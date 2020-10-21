import React from "react";
import HoverButton from "../utils/HoverButton";
import { IoIosHome } from "react-icons/io";
import { RiTrelloFill } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import trelloLogo from "../../images/trello-logo.png";
import HeaderPlus from "./HeaderPlus";
import Account from "./Account";

function HeaderAfterLogin(props) {
  // const { boardState, dispatchBoard } = props.board;
  return (
    <div className="relative p-1 bg-blue-600 ">
      <header className="flex justify-between">
        <div className="flex space-x-1 left">
          <HoverButton>{<IoIosHome size={20} />} </HoverButton>
          <HoverButton>
            <div className="flex items-center">
              <RiTrelloFill />
              <span className="ml-2">Boards</span>
            </div>
          </HoverButton>
          <input
            type="text"
            placeholder="Search cards"
            className="w-48 px-2 text-blue-100 bg-blue-300 focus:outline-none focus:w-64"
          />
        </div>
        <div className="absolute header-center">
          <HoverButton>
            <div>
              <img className="h-6" src={trelloLogo} alt="Trello" />
            </div>
          </HoverButton>
        </div>
        <div className="flex space-x-1 right">
          <div className="plus">
            <button
              onClick={() => props?.board?.dispatchBoard({ type: "show-plus" })}
              className="p-2 text-blue-100 bg-blue-300 rounded-sm hover:bg-blue-400 focus:outline-none "
            >
              <BsPlus />
            </button>
            {props?.board?.boardState.showPlus && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg w-80">
                <HeaderPlus dispatchBoard={props?.board?.dispatchBoard} />
              </div>
            )}
          </div>
          <div className="account">
            <button
              onClick={() =>
                props?.board?.dispatchBoard({ type: "show-account" })
              }
              className="p-2 text-blue-100 bg-blue-300 rounded-sm hover:bg-blue-400 focus:outline-none "
            >
              <FaUserCircle />
            </button>
            {props?.board?.boardState.showAccount && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg w-80">
                <Account dispatchBoard={props?.board?.dispatchBoard} />
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeaderAfterLogin;
