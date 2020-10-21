import React, { useState, useReducer } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import HeaderContext from "../../context/HeaderContext";
import useOnClickOutside from "../../utils/useOnClickOutside";
import HeaderAfterLogin from "../header/HeaderAfterLogin";
import AddList from "../list/AddList";
import List from "../list/List";

// const initialBoardState = { showPlus: false, showAccount: false };

// function boardReducer(state, action) {
//   switch (action.type) {
//     case "show-plus":
//       return { ...state, showPlus: true };
//     case "close-plus":
//       return { ...state, showPlus: false };
//     case "show-account":
//       return { ...state, showAccount: true };
//     case "close-account":
//       return { ...state, showAccount: false };
//     case "close-all":
//       return { showPlus: false, showAccount: false };
//     default:
//       return { ...state };
//   }
// }

function Board() {
  const context = useContext(HeaderContext);
  const { headerState, dispatchHeader } = context;
  const [addList, setAddList] = useState(false);
  // const [boardState, dispatchBoard] = useReducer(
  //   boardReducer,
  //   initialBoardState
  // );
  const listRef = useRef();
  const headerRef = useRef();
  useOnClickOutside(listRef, () => setAddList(false));
  useOnClickOutside(headerRef, () => dispatchHeader({ type: "close-all" }));

  return (
    <div className="min-h-screen p-1 text-gray-800 bg-theme">
      <div ref={headerRef}>
        <HeaderAfterLogin header={{ headerState, dispatchHeader }} />
      </div>
      <div className="flex items-start mt-4 space-x-6 lists">
        <List listTitle="Doing" />
        <List listTitle="To Do" />
        <List listTitle="Done" />
        <div ref={listRef} className="w-1/5 ">
          {addList ? (
            <AddList setAddList={setAddList} />
          ) : (
            <div className="flex items-center p-1 px-8 bg-gray-200 cursor-pointer hover:bg-gray-400 ">
              <FaPlus />
              <button
                onClick={() => setAddList(true)}
                className="w-full px-2 py-1 font-bold focus:outline-none"
              >
                Add another list
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Board;
