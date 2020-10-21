import React from "react";
import { Link } from "react-router-dom";
import heroSvg from "../../images/home/trello-hero.svg";

function Hero() {
  return (
    <div className="hero min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-600">
      <div className="container mx-auto py-32 px-24 lg:px-0">
        <div className=" grid gap-8 grid-cols-2">
          <div className="hero-content col-span-1 self-center text-white">
            <h1 className="text-5xl font-semibold leading-tight ">
              Trello helps teams work more collaboratively and get more done.
            </h1>
            <p className="text-2xl mt-6">
              Trello’s boards, lists, and cards enable teams to organize and
              prioritize projects in a fun, flexible, and rewarding way.
            </p>
          </div>
          <div className="hero-image col-span-1">
            <img src={heroSvg} alt="Hero" />
          </div>
        </div>
        <div className="enter-email mt-12 space-x-8 ">
          <input
            type="text"
            className="w-1/4 py-4 px-4 rounded-md bg-blue-100 focus:outline-none text-lg"
          />
          <Link className="bg-green-500 py-5 tracking-wider text-lg font-bold text-green-100 px-10 rounded-md">
            Sign Up - It's Free !
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
