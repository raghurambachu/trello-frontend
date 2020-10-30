import React from "react";
import { BsPersonFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import HeaderContext from "../../context/HeaderContext";
import BoardContext from "../../context/BoardContext";

function logout(history, setState, dispatchHeader) {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/logout`)
    .then((res) => {
      setState({ user: null });
      history.push("/login");
    })
    .catch((err) => {
      setState({ user: null });
      history.push("/login");
    })
    .finally(() => dispatchHeader({ type: "close-account" }));
}

function Account(props) {
  const { state, setState } = useContext(UserContext);
  const { dispatchHeader } = useContext(HeaderContext);
  return (
    <div className="relative w-full p-4 text-gray-700 rounded shadow-lg">
      <div className="absolute top-0 right-0">
        <FaTimes
          onClick={() => dispatchHeader({ type: "close-account" })}
          className="m-4 cursor-pointer"
        />
      </div>
      <h3 className="mb-2 text-center headerplus-header">Account</h3>
      <hr />
      <div className="flex items-center my-4">
        <BsPersonFill size={30} />
        <div className="ml-4">
          <h3>{state.user.name}</h3>
          <p>{state.user.email}</p>
        </div>
      </div>
      <hr />
      <ul className="">
        <li className="px-2 py-1 my-2 rounded cursor-pointer hover:bg-gray-300">
          Profile
        </li>
        <li
          onClick={() => logout(props.history, setState, dispatchHeader)}
          className="px-2 py-1 my-2 rounded cursor-pointer hover:bg-gray-300"
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default withRouter(Account);
