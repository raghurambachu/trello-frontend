import React, { useState, useReducer, useRef } from "react";
import { GrAdd } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";
import { Dialog } from "@reach/dialog";

import Card from "../card/Card";
import VisuallyHidden from "@reach/visually-hidden";
import ShowCard from "../card/ShowCard";
import AddCard from "../card/AddCard";

import useOnClickOutside from "../../utils/useOnClickOutside";

function handleCardClick(title, openCard) {
  openCard();
}

const initialState = { addCard: false, editTitle: false };

function reducer(state, action) {
  switch (action.type) {
    case "add-card":
      return { ...state, addCard: true };
    case "save-card":
      return { ...state, addCard: false };
    case "edit-title":
      return { ...state, editTitle: true };
    case "save-title":
      return { ...state, editTitle: false };
    case "close-card":
      return { ...state, addCard: false };
    default:
      return { ...state };
  }
}

function List(props) {
  const [showCard, setShowCard] = useState(false);
  const openCard = () => setShowCard(true);
  const closeCard = () => setShowCard(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const addCardRef = useRef();
  const titleRef = useRef();

  useOnClickOutside(addCardRef, () => dispatch({ type: "close-card" }));
  useOnClickOutside(titleRef, () => dispatch({ type: "save-title" }));

  return (
    <article className="w-1/5 p-2 text-gray-700 bg-gray-300 rounded-md list">
      <div className="mb-2" ref={titleRef}>
        {state.editTitle ? (
          <form onSubmit={() => dispatch({ type: "save-title" })}>
            <input
              className="w-full p-1 px-2 border-2 border-gray-700"
              type="text"
              value={props.listTitle}
            />{" "}
          </form>
        ) : (
          <h3
            onClick={() => dispatch({ type: "edit-title" })}
            className="font-semibold"
          >
            {props.listTitle}
          </h3>
        )}
      </div>
      <ul className="cards">
        {getCards().map(({ title }) => (
          <li key={title}>
            <Card
              onClick={() => handleCardClick(title, openCard)}
              title={title}
            />
            <Dialog
              style={{ width: "60vw", position: "relative" }}
              aria-label="Show card"
              isOpen={showCard}
              onDismiss={closeCard}
            >
              <button
                className="absolute top-0 right-0 m-2 close-button"
                onClick={closeCard}
              >
                <VisuallyHidden>Close</VisuallyHidden>
                <span aria-hidden>
                  <FaTimes />
                </span>
              </button>
              <ShowCard />
            </Dialog>
          </li>
        ))}
      </ul>
      <div ref={addCardRef} className="mt-2 text-base list-footer">
        {state.addCard ? (
          <AddCard dispatch={dispatch} />
        ) : (
          <button
            onClick={() => dispatch({ type: "add-card" })}
            className="flex items-center px-4 space-x-4 focus:outline-none"
          >
            <GrAdd />
            <span>Add another card</span>
          </button>
        )}
      </div>
    </article>
  );
}

function getCards() {
  return [
    {
      title: "Cloning Trello",
    },
    {
      title: "Building cardss",
    },
  ];
}

export default List;
