import axios from "axios";
import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
} from "react";
import { FaPlus } from "react-icons/fa";
import BoardContext, {
  boardReducer,
  initialBoardState,
} from "../../context/BoardContext";
import HeaderContext from "../../context/HeaderContext";
import useOnClickOutside from "../../utils/useOnClickOutside";
import HeaderAfterLogin from "../header/HeaderAfterLogin";
import CreateList from "../list/CreateList";
import List from "../list/List";

function Board(props) {
  const { id: boardId } = props.match.params;

  const context = useContext(HeaderContext);
  const { headerState, dispatchHeader } = context;
  const [addList, setAddList] = useState(false);

  const listRef = useRef();
  useOnClickOutside(listRef, () => setAddList(false));
  const headerRef = useRef();
  useOnClickOutside(headerRef, () => dispatchHeader({ type: "close-all" }));

  const [boardState, dispatchBoard] = useReducer(
    boardReducer,
    initialBoardState
  );
  useEffect(() => {
    dispatchBoard({ type: "set-boardid", value: boardId });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/lists/${boardId}/all`)
      .then((res) => {
        dispatchBoard({ type: "set-lists", value: res?.data?.lists });
        // dispatchBoard({ type: "set-boardid", value: boardId });
      })
      .catch((err) => console.log(err.response.data.msg));
  }, []);

  return (
    <BoardContext.Provider value={{ boardState, dispatchBoard }}>
      <div className="min-h-screen p-1 overflow-x-scroll text-gray-800 bg-theme ">
        <div ref={headerRef}>
          <HeaderAfterLogin header={{ headerState, dispatchHeader }} />
        </div>
        <div className="flex items-start pt-10 mt-4 space-x-6 lists">
          {boardState?.lists?.map((list) => (
            <List
              boardId={boardId}
              list={list}
              key={list._id}
              listTitle={list.name}
            />
          ))}

          <div ref={listRef} className="list">
            {addList ? (
              <CreateList boardId={boardId} setAddList={setAddList} />
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
    </BoardContext.Provider>
  );
}

export default Board;
