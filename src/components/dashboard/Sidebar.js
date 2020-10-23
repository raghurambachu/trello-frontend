import React from "react";
import { FaTrello } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";

import "@reach/dialog/styles.css";
import DashboardTeams from "./DashboardTeams";

function Sidebar(props) {
  return (
    <div className="sticky top-0">
      <div className="actions">
        <button className="flex items-center w-full px-4 py-1 mb-2 space-x-2 bg-gray-300 rounded-sm">
          <FaTrello />
          <span>Boards</span>
        </button>
        <button className="flex items-center w-full px-4 mb-2 space-x-2">
          <GiSoundWaves />
          <span>Home</span>
        </button>
      </div>
      <DashboardTeams {...props} />
    </div>
  );
}

export default Sidebar;
