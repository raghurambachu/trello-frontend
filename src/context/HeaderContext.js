import { createContext } from "react";

export const initialHeaderState = { showPlus: false, showAccount: false };

export function headerReducer(state, action) {
  switch (action.type) {
    case "show-plus":
      return { ...state, showPlus: true };
    case "close-plus":
      return { ...state, showPlus: false };
    case "show-account":
      return { ...state, showAccount: true };
    case "close-account":
      return { ...state, showAccount: false };
    case "close-all":
      return { showPlus: false, showAccount: false };
    default:
      return { ...state };
  }
}

const HeaderContext = createContext();

export default HeaderContext;
