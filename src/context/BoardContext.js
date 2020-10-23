import { createContext, useReducer } from "react";

export const initialBoardState = { lists: null, boardId: null };

export function boardReducer(state, action) {
  switch (action.type) {
    case "add-list": {
      const list = action.value;
      const lists = state.lists || [];
      return { ...state, lists: [...lists, list] };
    }
    case "set-boardid": {
      return { ...state, lists: action.value };
    }
    case "set-lists": {
      return { ...state, lists: action.value };
    }
    case "add-card": {
      const card = action.value;
      const listId = card.listId;
      let lists = state.lists.map((list) => {
        if (list._id === listId) {
          return { ...list, cards: [...list.cards, card] };
        }
        return list;
      });

      return { ...state, lists };
    }
    case "set-cards": {
      return;
    }
    default:
      return { ...state };
  }
}

const BoardContext = createContext();

export default BoardContext;
