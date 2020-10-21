import React from "react";

import team from "../../images/home/team.svg";
import information from "../../images/home/information.svg";
import butler from "../../images/home/butler.png";
import playbook from "../../images/home/playbook.png";
import integration from "../../images/home/integrations.png";
import sync from "../../images/home/sync.png";
import applestore from "../../images/home/btn-appstore-black.png";
import playstore from "../../images/home/btn-playstore-black.png";

function Team() {
  return (
    <div className="container pt-24 mx-auto text-gray-700 ">
      <div className="grid grid-cols-10">
        <div className="col-span-4  text-gray-700 self-center">
          <h2 className="text-4xl leading-relaxed font-semibold ">
            Work with any team
          </h2>
          <p className="text-xl my-4">
            Whether it’s for work, a side project or even the next family
            vacation, Trello helps your team stay organized.{" "}
          </p>
          <button className="bg-gray-600 py-2 px-8 font-bold rounded-sm text-gray-200">
            Start doing
          </button>
        </div>
        <div className="col-span-6 shadow-xl rounded-md bg-gradient-to-b from-blue-500 via-blue-600 to-indigo-600 self-center justify-self-center ">
          <img width={700} src={team} alt="Team" />
        </div>
      </div>
      <div className=" grid grid-cols-10 gap-8 py-24">
        <div className="col-span-4  text-gray-700 self-center bg-gradient-to-b rounded-md shadow-md from-blue-600 via-indigo-100 to-purple-100 ">
          <img width={700} src={information} alt="Information" />
        </div>
        <div className="col-span-6  self-center justify-self-center ">
          <h2 className="text-3xl font-bold">Information at a glance</h2>
          <p className="text-lg">
            Dive into the details by adding comments, attachments, due dates,
            and more directly to Trello cards. Collaborate on projects from
            beginning to end.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-8 pb-24">
        <div className="col-span-6 text-lg text-gray-800 ">
          <h2 className="text-3xl font-semibold mb-8">
            Built-In Workflow Automation With Butler
          </h2>
          <p className="my-4">
            Let the robots do the work! Boost productivity by unleashing the
            power of automation across your entire team with Butler, and remove
            tedious tasks from your to-do lists with:
          </p>
          <ul className="list-inside ">
            <li>Rule-Based Triggers</li>
            <li>Custom Card & Board Buttons</li>
            <li>Calendar Commands</li>
            <li>Due Date Commands</li>
          </ul>
        </div>
        <div className="col-span-4">
          <img src={butler} alt="Butler" />
        </div>
      </div>
      <section className="text-center trello-way text-gray-800">
        <h2 className="text-4xl  font-semibold">Trello your way</h2>
        <p className="text-xl my-4 mb-8">
          Use Trello the way your team works best. We’ve got the flexibility &
          features to fit any team’s style.
        </p>
        <div className="flex">
          <article className="w-1/3 px-4">
            <div className="playbook-image">
              <img src={playbook} alt="Playbook" />
            </div>
            <div>
              <h2 className="text-2xl">The Team Playbook</h2>
              <p>
                It’s easy to get your team up and running with Trello. We’ve
                collected all of the boards and tools your team needs to succeed
                in one handy resource.
              </p>
              <button className="bg-gray-500 py-2 px-4 text-lg font-bold text-gray-100 my-4 rounded-md">
                Make A Game Plan
              </button>
            </div>
          </article>
          <article className="w-1/3 px-4">
            <div className="integration-image">
              <img src={integration} alt="Integration" />
            </div>
            <div>
              <h2 className="text-2xl">A Productivity Platform</h2>
              <p>
                Integrate the apps your team already uses directly into your
                workflow. Power-Ups turn Trello boards into living applications.
              </p>
              <button className="bg-gray-500 py-2 px-4 text-lg font-bold text-gray-100 my-4 rounded-md">
                Power Up Workflow
              </button>
            </div>
          </article>
          <article className="w-1/3 px-4">
            <div className="sync-image">
              <img src={sync} alt="Sync" />
            </div>
            <div>
              <h2 className="text-2xl">Always In Sync</h2>
              <p>
                No matter where you are, Trello stays in sync across all of your
                devices. Collaborate with your team anywhere, from sitting on
                the bus to sitting on the beach.
              </p>
              <div className="flex space-x-4 ">
                <button className="">
                  <img
                    className="inline-block"
                    src={applestore}
                    alt="Applestore"
                  />
                </button>
                <button className="">
                  <img
                    className="inline-block"
                    src={playstore}
                    alt="Playstore"
                  />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Team;
