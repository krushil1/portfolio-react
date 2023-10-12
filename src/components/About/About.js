import React from "react";
import ExperienceItem from "./Experience/ExperienceItem";
import Mello from "../../assets/mello.png";

function About() {
  return (
    <div className="container mx-auto" id="about">
      <div className="flex flex-col justify-center items-center min-h-screen bg-white-100 px-6 md:px-24 py-20">
        <div className="text-2xl sm:text-3xl text-orange font-semibold border-b-4 border-orange inline-block mb-4">
          About Me
        </div>

        <div className="flex flex-col items-center text-center mt-1">
          <div className="flex items-center">
            <i className="bx bxs-map text-gray text-1xl hover:text-lightgray" />
            <span className="text-gray font-semibold">Pennsylvania</span>
          </div>
          <div>
            <p className="text-sm sm:text-1xl sm:max-w-4xl text-gray font-medium mt-2">
              As a CS Sophomore at Penn State, I thrive on tech,
              entrepreneurship, and the thrill of flying. Channeling my passion
              for innovation into both the tech & aviation landscapes.
            </p>
          </div>
        </div>

        <div className="flex items-center text-orange font-semibold mt-8">
          <span className="text-2xl mr-2">Experience</span>
          <i className="bx bxs-shapes text-2xl mr-2" />
        </div>

        <ExperienceItem />

        <div className="mt-11 w-6/12 md:w-3/12 ml-auto md:mt-0">
          <img src={Mello} alt="Mello" className="w-full md:w-auto" />
        </div>

      </div>
    </div>
  );
}

export default About;
