import React, { useContext } from "react";

import DashboardContext from "../../context/DashboardContext";
import TeamBoards from "./TeamBoards";

function getActiveTeam(teams, currentTeam) {
  if (currentTeam === "all") {
    return teams;
  } else {
    return teams?.filter((team) => team.name === currentTeam);
  }
}

function BoardArea(props) {
  const dashboardContext = useContext(DashboardContext);
  const { dashboardState } = dashboardContext;
  const teams = getActiveTeam(
    dashboardState?.teams,
    dashboardState.currentTeam
  );
  return (
    <>
      <ul>
        {teams?.map((team) => (
          <TeamBoards team={team} key={team._id} />
        ))}
      </ul>
    </>
  );
}

export default BoardArea;
