import React from "react";
import Picture from "./../../assets/skills.png";
import expertise from "../Data/ExpertiseData";
import "./Expertise.css";

function Expertise() {
  const { technologies } = expertise[0];

  return (
    <div className="container mx-auto" id="expertise">
      <div className="min-h-screen px-4 sm:px-6 md:px-24 py-20">
        <div className="w-full text-center mb-4">
          <div className="text-xl sm:text-2xl md:text-3xl text-orange font-semibold border-b-4 border-orange inline-block">
            Expertise
          </div>
        </div>

        <div className="flex flex-col sm:flex-row mt-12 sm:mt-32">
          <div className="w-full sm:w-1/2 pr-0 sm:pr-4 mb-8 sm:mb-0">
            <div className="justify-start mb-4 text-gray font-medium">
              <p className="text-sm sm:text-base">Learning one thing at a time.</p>
              <div className="flex flex-col">
                <p className="text-sm sm:text-base text-gray mt-4 sm:mt-8">
                  "The biggest asset in the world is your mindset"
                </p>
                <p className="text-sm sm:text-base font-semibold ml-4">~Gary Vaynerchuk</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 p-2">
              {technologies.map((icon, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer justify-center items-center w-12 h-12 rounded-md text-orange text-4xl shadow-effect transform transition-transform duration-300 hover:-translate-y-1"
                  dangerouslySetInnerHTML={{ __html: icon }}
                />
              ))}
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <img
              src={Picture}
              alt="skill's pic"
              className="mx-auto w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;
