import React, { useReducer, useState } from "react";
import { CgTouchpad } from "react-icons/cg";
import { VscListSelection, VscListFilter } from "react-icons/vsc";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { BiLabel } from "react-icons/bi";
import { MdUpdate, MdAttachFile } from "react-icons/md";

import Dialog from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";
import Label from "../header/Label";
import DueDate from "./DueDate";
import AddLabel from "../label/AddLabel";
import CreateLabel from "../label/CreateLabel";
import AddMember from "./AddMember";
// import useOnClickOutside from "../../utils/useOnClickOutside";

const initialLabelState = { show: false, active: AddLabel };

function labelReducer(state, action) {
  switch (action.type) {
    case "add-label":
      return { show: true, active: AddLabel };
    case "create-label":
      return { show: true, active: CreateLabel };
    case "close":
      return { show: false, active: AddLabel };
    default:
      return state;
  }
}

function ShowCard() {
  const [showDate, setShowDate] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const openDate = () => setShowDate(true);
  const closeDate = () => setShowDate(false);
  // const editRef = useRef();
  // useOnClickOutside(editRef, () => setEditDesc(false));

  const [labelState, labelDispatch] = useReducer(
    labelReducer,
    initialLabelState
  );
  const Component = labelState.active;

  return (
    // <div className="fixed top-0 left-0 right-0 flex items-center justify-center min-h-screen bg-transparent bg-gray-700 card-details ">
    <section className="p-4 bg-gray-100 card-detail">
      <div className="card-detail-header ">
        <div className="flex items-center space-x-4 title">
          <CgTouchpad className="self-start mt-2" size={20} />
          <div>
            <h3 className="text-xl">cloning Trello</h3>
            <small>
              in list <span className="text-base underline">Doing</span>{" "}
            </small>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-4 card-detail-body">
        <div className="col-span-8 text-gray-700 card-content">
          <div className="px-8 labels">
            <h3 className="mt-4 font-semibold">Labels</h3>
            <ul className="flex space-x-1">
              <Label
                title="completed"
                background="bg-green-500 text-green-100 rounded-sm"
              />
              <Label
                title="in-progress"
                background="bg-orange-500 text-orange-100 rounded-sm"
              />
            </ul>
          </div>
          <div className="flex items-center mt-4 space-x-4 description">
            <VscListSelection className="self-start mt-2" size={20} />
            <div className="w-full">
              <h3 className="flex text-base">
                Description
                <span
                  onClick={() => setEditDesc(true)}
                  className="px-2 py-1 ml-2 bg-gray-300 rounded-sm"
                >
                  Edit
                </span>
              </h3>
              <div>
                {editDesc ? (
                  <form className="" onSubmit={() => setEditDesc(false)}>
                    <textarea
                      className="block w-full h-16 p-1 mt-4 border-2 border-gray-800 resize-none"
                      name="edit-desc"
                    ></textarea>
                  </form>
                ) : (
                  <p onClick={() => setEditDesc(true)}>Start building model</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center mt-8 space-x-4 activity">
            <VscListFilter className="self-start " size={20} />
            <div className="w-full">
              <p className="flex justify-between text-base ">
                <span className="font-bold">Activity</span>
                <span className="px-2 py-1 ml-2 bg-gray-300 rounded-sm">
                  Show Details
                </span>
              </p>
              <div className="mt-4 comments">
                <textarea
                  name="comment"
                  id="comment"
                  className="block w-full h-10 p-1 border rounded-md resize-none focus:outline-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 text-gray-700 sidebar">
          <h3 className="font-semibold">Suggested</h3>
          <ul>
            <li className="relative cursor-pointer">
              <div
                onClick={() => setShowMember(true)}
                className="flex items-center px-2 py-1 mb-2 bg-gray-300 rounded-sm "
              >
                <FaUserCircle />
                <span className="ml-1">Members</span>
              </div>
              <Dialog
                aria-label="Due Date"
                isOpen={showMember}
                style={{ width: "320px", padding: "0", position: "relative" }}
                onDismiss={() => setShowMember(false)}
              >
                <button
                  className="absolute top-0 right-0 m-2 close-button "
                  onClick={() => setShowMember(false)}
                >
                  <VisuallyHidden>Close</VisuallyHidden>
                  <span aria-hidden>
                    <FaTimes />
                  </span>
                </button>
                <AddMember />
              </Dialog>
            </li>
            <li className="cursor-pointer">
              <div
                onClick={() => labelDispatch({ type: "add-label" })}
                className="flex items-center px-2 py-1 mb-2 bg-gray-300 rounded-sm"
              >
                <BiLabel />
                <span className="ml-1">Labels</span>
              </div>
              <Dialog
                aria-label="label"
                isOpen={labelState.show}
                style={{ width: "280px", padding: "0", position: "relative" }}
                onDismiss={() => labelDispatch({ type: "close" })}
              >
                <button
                  className="absolute top-0 right-0 m-2 close-button"
                  onClick={() => labelDispatch({ type: "close" })}
                >
                  <VisuallyHidden>Close</VisuallyHidden>
                  <span aria-hidden>
                    <FaTimes />
                  </span>
                </button>
                {<Component labelDispatch={labelDispatch} />}
              </Dialog>
            </li>
            <li className="cursor-pointer">
              <div
                onClick={openDate}
                className="flex items-center px-2 py-1 mb-2 bg-gray-300 rounded-sm"
              >
                <MdUpdate />
                <span className="ml-1">Due Date</span>
              </div>
              <Dialog
                aria-label="Due Date"
                isOpen={showDate}
                style={{ width: "320px", padding: "0", position: "relative" }}
                onDismiss={closeDate}
              >
                <button
                  className="absolute top-0 right-0 m-2 close-button "
                  onClick={closeDate}
                >
                  <VisuallyHidden>Close</VisuallyHidden>
                  <span aria-hidden>
                    <FaTimes />
                  </span>
                </button>
                <DueDate />
              </Dialog>
            </li>
            <li className="flex items-center px-2 py-1 mb-2 bg-gray-300 rounded-sm">
              <MdAttachFile />
              <span className="ml-1">Attachment</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    // </div>
  );
}

export default ShowCard;
