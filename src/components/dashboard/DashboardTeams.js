import React, { useContext } from "react";
import { BsPlus } from "react-icons/bs";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import CreateTeam from "../team/CreateTeam";
import TeamItem from "./TeamItem";
import DashboardContext from "../../context/DashboardContext";
import TeamContext from "../../context/TeamContext";
import CreateTeamDialog from "../team/CreateTeamDialog";

function handleTeamItemClick(currentTeam, dispatchDashboard) {
  dispatchDashboard({ type: "show-current-team", value: currentTeam });
}

function DashboardTeams(props) {
  const dashboardContext = useContext(DashboardContext);
  const { dashboardState, dispatchDashboard } = dashboardContext;
  const { dispatchTeam } = useContext(TeamContext);
  return (
    <div className="px-2 mt-8 teams">
      <div className="flex items-center justify-between text-xs font-bold uppercase">
        <h3>Teams</h3>
        <BsPlus
          onClick={() => dispatchTeam({ type: "show-team" })}
          className="bg-gray-200 cursor-pointer hover:bg-gray-400"
          size={20}
        />
        <CreateTeamDialog />
      </div>
      <ul className="team-list">
        <TeamItem
          onClick={() => handleTeamItemClick("all", dispatchDashboard)}
          teamTitle="All Teams"
          classname={dashboardState.currentTeam === "all" ? "bg-gray-300" : ""}
        />
        {dashboardState?.teams?.map((team) => (
          <TeamItem
            onClick={() => handleTeamItemClick(team.name, dispatchDashboard)}
            key={team._id}
            teamTitle={team.name}
            classname={
              dashboardState.currentTeam === team.name ? "bg-gray-300" : ""
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default DashboardTeams;
