import React from "react";
import { useState } from "react";
import createTeam from "../../images/team/createTeam.svg";

function CreateTeam() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // handle Submit function
  // fetch OR actionCreator
  // lift state up -> props.addNewTeam({ name, description })

  return (
    <div className="container text-gray-700 bg-gray-200 rounded-lg create-team">
      <div className="grid grid-cols-2 ">
        <div className="col-span-1 px-24 py-16">
          <h2 className="text-2xl font-bold">Let's Build a Team</h2>
          <p className="my-2 text-lg">
            Boost your productivity by making it easier for everyone to access
            boards in one location.
          </p>
          <form className="my-8">
            <div className="my-2">
              <label
                htmlFor="team-name"
                className="block mb-2 text-xs font-bold"
              >
                Team Name
              </label>
              <input
                className="w-10/12 p-2 rounded"
                type="text"
                placeholder="Taco's co."
                id="team-name"
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="team-description"
                className="block mb-2 text-xs font-bold"
              >
                Team Description
              </label>
              <textarea
                className="block w-10/12 h-40 p-2 rounded resize-none"
                type="text"
                placeholder="Our team organizes everything here."
                id="team-description"
              ></textarea>
              <small>
                Get your members on board with a few words about your team.
              </small>
            </div>

            <button className="w-10/12 p-3 my-4 text-sm text-gray-100 bg-gray-500 ">
              Continue{" "}
            </button>
          </form>
        </div>
        <div className="col-span-1 px-24 py-40 bg-gradient-to-b from-green-100 via-green-200 to-green-100 ">
          <img src={createTeam} alt="Create Team" />
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
