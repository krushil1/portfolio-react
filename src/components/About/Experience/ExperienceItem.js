import React, { useState } from "react";
import "./ExperienceItem.css";
import experiences from "./ExperienceData";
import ExperienceModal from "./ExperienceModal";

function ExperienceItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalExperience, setModalExperience] = useState(null);

  const openModal = (experience) => {
    setModalExperience(experience);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalExperience(null);
    setIsModalOpen(false);
  };

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
              className="cursor-pointer shadow-effect rounded-lg flex items-center p-2 sm:p-2 transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
              onClick={() => openModal(experience)} 
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
                <div onClick={() => openModal(experience)}>
                  <p className="text-gray font-semibold">More info</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalExperience && (
        <ExperienceModal
          experience={modalExperience}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default ExperienceItem;
