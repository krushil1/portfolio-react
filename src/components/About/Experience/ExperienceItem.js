import React from "react";
import "./ExperienceItem.css";
import experiences from "./ExperienceData"; 

function ExperienceItem() {
  const isSingleExperience = experiences.length === 1;

  return (
    <div className="container mx-auto mt-5">
      <div className="max-w-4xl mx-auto">
        <div
          className={`${
            isSingleExperience ? "flex justify-center" : "grid"
          } grid-cols-1 sm:grid-cols-2 gap-5`}
        >
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="shadow-effect rounded-lg flex items-center p-2 sm:p-2 transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
            >
              <div className="border-r-2 border-gray">
                <img
                  src={experience.image}
                  alt="veefriends logo"
                  className="object-cover w-20 h-20 md:w-32 md:h-32"
                />
              </div>
              <div className="ml-3">
                <p className="text-xl font-bold text-orange mb-2">
                  {experience.name}
                </p>
                <p className="dark:text-gray font-semibold mb-1">
                  {experience.role}
                </p>
                <p className="text-gray">{experience.location}</p>
                <p className="text-gray">{experience.date}</p>
                <div>
                  <a href={experience.link} target="_blank" rel="noreferrer">
                    <p className="text-gray font-semibold">More info</p>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExperienceItem;
