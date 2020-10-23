import React, { useContext, useState } from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import TeamContext, { getActiveTeamModal } from "../../context/TeamContext";
// import CreateTeam from "./CreateTeam";

function CreateTeamDialog() {
  const teamContext = useContext(TeamContext);
  const { teamState, dispatchTeam } = teamContext;
  const [teamId, setTeamId] = useState(null);
  return (
    <DialogOverlay
      style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
      isOpen={teamState.showTeam}
      onDismiss={() => dispatchTeam({ type: "close-team" })}
    >
      <DialogContent
        aria-label="Create Team"
        style={
          teamState.isTeamCreated
            ? {
                boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)",
                width: "520px",
                position: "relative",
              }
            : { boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)" }
        }
      >
        {getActiveTeamModal(
          teamState.isTeamCreated,
          teamId,
          setTeamId,
          dispatchTeam
        )}
      </DialogContent>
    </DialogOverlay>
  );
}

export default CreateTeamDialog;
