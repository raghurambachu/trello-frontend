import React from "react";
import HeaderBeforeLogin from "../header/HeaderBeforeLogin";
import Hero from "./Hero";
import Team from "./Team";

function Home() {
  return (
    <div className="home">
      <HeaderBeforeLogin />
      <Hero />
      <Team />
    </div>
  );
}

export default Home;
