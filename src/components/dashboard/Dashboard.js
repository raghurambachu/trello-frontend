import React, { useRef, useContext } from "react";
import { FaTrello } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";
import { BsFillPeopleFill, BsPlus, BsPersonFill } from "react-icons/bs";

import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

import HeaderAfterLogin from "../header/HeaderAfterLogin";
import BoardItem from "./BoardItem";
import AddBoard from "./AddBoard";
import CreateTeam from "../team/CreateTeam";
import HeaderContext from "../../context/HeaderContext";
import useOnClickOutside from "../../utils/useOnClickOutside";

function Dashboard() {
  const context = useContext(HeaderContext);
  const { headerState, dispatchHeader } = context;
  const [showBoard, setShowBoard] = React.useState(false);
  const [showTeam, setShowTeam] = React.useState(false);
  const openTeam = () => setShowTeam(true);
  const closeTeam = () => setShowTeam(false);
  const openBoard = () => setShowBoard(true);
  const closeBoard = () => setShowBoard(false);

  const headerRef = useRef();
  useOnClickOutside(headerRef, () => dispatchHeader({ type: "close-all" }));
  const addNewTeam = (team) => {
    // push it to the teams array
  };
  return (
    <div className="min-h-screen">
      <div ref={headerRef}>
        <HeaderAfterLogin header={{ headerState, dispatchHeader }} />
      </div>
      <div className="grid grid-cols-10 gap-8 py-12 mx-auto text-gray-800 wrapper">
        <div className="col-span-3">
          <div className="sticky top-0">
            <div className="actions">
              <button className="flex items-center w-full px-4 py-1 mb-2 space-x-2 bg-gray-300 rounded-sm">
                <FaTrello />
                <span>Boards</span>
              </button>
              <button className="flex items-center w-full px-4 mb-2 space-x-2">
                <GiSoundWaves />
                <span>Home</span>
              </button>
            </div>
            <div className="px-2 mt-8 teams">
              <div className="flex items-center justify-between text-xs font-bold uppercase">
                <h3>Teams</h3>
                <BsPlus
                  onClick={openTeam}
                  className="bg-gray-200 cursor-pointer hover:bg-gray-400"
                  size={20}
                />
                <DialogOverlay
                  style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
                  isOpen={showTeam}
                  onDismiss={closeTeam}
                >
                  <DialogContent
                    aria-label="Create Team"
                    style={{ boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)" }}
                  >
                    <CreateTeam addNewTeam={addNewTeam} />
                  </DialogContent>
                </DialogOverlay>
              </div>
              <ul className="team-list">
                <li className="flex items-start p-1 mt-2 mb-1 rounded-sm hover:bg-gray-300 ">
                  <BsFillPeopleFill />
                  <span className="ml-3 ">Altcampussians</span>
                </li>
                <li className="flex items-start p-1 mt-2 mb-1 rounded-sm hover:bg-gray-300 ">
                  <BsFillPeopleFill />
                  <span className="ml-3 ">Altcampus</span>
                </li>
                <li className="flex items-start p-1 mt-2 mb-1 rounded-sm hover:bg-gray-300 ">
                  <BsFillPeopleFill />
                  <span className="ml-3 ">Altindians</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-7">
          <div className="mb-4 personal-board">
            <div className="flex items-center mb-4">
              <BsPersonFill />
              <h3 className="ml-3 text-lg font-bold">Personal Boards</h3>
            </div>
            <ul className="flex personal-board-list">
              <li>
                <button className="relative " onClick={openBoard}>
                  <BoardItem />
                </button>
                <div>
                  <DialogOverlay
                    style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
                    isOpen={showBoard}
                    onDismiss={closeBoard}
                  >
                    <DialogContent
                      aria-label="Create Board"
                      style={{
                        boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
                        width: "360px",
                      }}
                    >
                      <AddBoard close={closeBoard} />
                    </DialogContent>
                  </DialogOverlay>
                </div>
              </li>
            </ul>
          </div>
          <div className="mb-4 team-board">
            <div className="flex items-center mb-4">
              <BsPersonFill />
              <h3 className="ml-3 text-lg font-bold">Altcampussians</h3>
            </div>
            <ul className="flex personal-board-list">
              <li>
                <BoardItem />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
