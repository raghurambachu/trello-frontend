import React, { useRef, useContext, useEffect, useReducer } from "react";
import "@reach/dialog/styles.css";
import axios from "axios";

import HeaderAfterLogin from "../header/HeaderAfterLogin";
import HeaderContext from "../../context/HeaderContext";
import useOnClickOutside from "../../utils/useOnClickOutside";
import Sidebar from "./Sidebar";
import BoardArea from "./BoardArea";
import DashboardContext from "../../context/DashboardContext";

const initialDashboardState = {
  teams: null,
  currentTeam: "all",
  pageErr: "",
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case "add-team":
      return { ...state, teams: [action.team, ...state.teams] };
    case "add-board": {
      const board = action.value;
      const teamId = board.teamId;
      const teams = state.teams.map((particularTeam) => {
        if (particularTeam._id === teamId) {
          particularTeam.boards = [board, ...particularTeam.boards];
        }
        return particularTeam;
      });
      return { ...state, teams };
    }
    case "set-team": {
      return { ...state, teams: [...state.teams, action.value] };
    }
    case "set-teams": {
      const teams = action.value;
      return { ...state, teams };
    }
    case "show-current-team": {
      return { ...state, currentTeam: action.value };
    }
    case "set-error":
      return { ...state, pageErr: action.value };
    default:
      return { ...state };
  }
}

function Dashboard(props) {
  const headerContext = useContext(HeaderContext);
  const [dashboardState, dispatchDashboard] = useReducer(
    dashboardReducer,
    initialDashboardState
  );
  const { headerState, dispatchHeader } = headerContext;

  const [showTeam, setShowTeam] = React.useState(false);
  const headerRef = useRef();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/teams`)
      .then((res) =>
        dispatchDashboard({ type: "set-teams", value: res?.data?.teams })
      )
      .catch((err) => console.log(err?.response));
  }, []);

  useOnClickOutside(headerRef, () => dispatchHeader({ type: "close-all" }));
  const addNewTeam = (team) => {
    // push it to the teams array
  };
  return (
    <DashboardContext.Provider value={{ dashboardState, dispatchDashboard }}>
      <div className="min-h-screen">
        <div ref={headerRef}>
          <HeaderAfterLogin header={{ headerState, dispatchHeader }} />
        </div>

        {dashboardState.pageErr && (
          <h4 className="py-2 text-center text-red-400">
            {dashboardState.pageErr}
          </h4>
        )}

        <div className="grid grid-cols-10 gap-8 py-12 mx-auto text-gray-800 wrapper">
          <div className="col-span-3">
            <Sidebar
              showTeam={showTeam}
              addNewTeam={addNewTeam}
              openTeam={() => setShowTeam(true)}
              closeTeam={() => setShowTeam(false)}
            />
          </div>
          <div className="col-span-7">
            <BoardArea />
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
