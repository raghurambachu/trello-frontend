import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import BoardItem from "./BoardItem";
import CreateBoard from "./CreateBoard";
import { Link } from "react-router-dom";

function TeamBoards(props) {
  const [showBoard, setShowBoard] = React.useState(false);
  return (
    <li className="mb-4 team-board">
      <div className="flex items-center mb-4">
        <BsPersonFill />
        <h3 className="ml-3 text-lg font-bold">{props.team.name}</h3>
      </div>
      <ul className="flex flex-wrap gap-2 m-2 board-list">
        {props?.team?.boards?.map((board) => (
          <Link to={`/board/${board._id}`} key={board.name}>
            <BoardItem className="bg-blue-200" name={board.name} />
          </Link>
        ))}

        <li>
          <button className="relative " onClick={() => setShowBoard(true)}>
            <BoardItem name="Create new board" />
          </button>
          <div>
            <DialogOverlay
              style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
              isOpen={showBoard}
              onDismiss={() => setShowBoard(false)}
            >
              <DialogContent
                aria-label="Create Board"
                style={{
                  boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
                  width: "360px",
                }}
              >
                <CreateBoard
                  team={props.team}
                  close={() => setShowBoard(false)}
                />
              </DialogContent>
            </DialogOverlay>
          </div>
        </li>
      </ul>
    </li>
  );
}

export default TeamBoards;
