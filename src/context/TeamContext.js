import React from "react";
import AddMembers from "../components/team/AddMembers";
import CreateTeam from "../components/team/CreateTeam";

export const initialTeamState = { showTeam: false, isTeamCreated: false };

export function getActiveTeamModal(
  isTeamCreated,
  teamId,
  setTeamId,
  dispatchTeam
) {
  if (!isTeamCreated) return <CreateTeam setTeamId={setTeamId} />;
  else return <AddMembers teamId={teamId} dispatchTeam={dispatchTeam} />;
}

export function teamReducer(state, action) {
  switch (action.type) {
    case "show-team":
      return { ...state, showTeam: true };
    case "close-team":
      return { ...state, showTeam: false };
    case "team-created":
      return { ...state, isTeamCreated: true };
    case "reset":
      return { ...state, showTeam: false, isTeamCreated: false };
    default:
      return { ...state };
  }
}

const TeamContext = React.createContext();

export default TeamContext;
