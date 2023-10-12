import React, { useState } from "react";
import projects from "../Data/ProjectData";
import Picture from "../../assets/work.png";
import "./MyProjects.css";

function MyProjects() {
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleViewMore = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  return (
    <div className="shadow-md">
      <div className="container mx-auto" id="projects">
        <div className="min-h-screen bg-white-100 px-4 sm:px-6 md:px-24 py-20">
          <div className="w-full text-center mb-4">
            <div className="sm:mt-10 text-xl sm:text-2xl md:text-3xl text-orange font-semibold border-b-4 border-orange inline-block">
              My Projects
            </div>
            <div className="text-gray mt-6 text-md sm:text-xl font-medium">
              My top 3 all time favorite projects i've crafted!
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-5 sm:mt-16">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 sm:p-10 rounded-md shadow-effect"
                >
                  <div className="text-xl font-semibold mb-2 text-orange">
                    {project.name}
                  </div>
                  <div className="text-sm sm:text-[15px] text-gray mb-4">
                    {project.mini_desc}
                  </div>
                  <button
                    onClick={() => handleViewMore(project)}
                    className="text-gray font-semibold cursor-pointer hover:text-lightgray"
                  >
                    View More
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-orange font-semibold text-xl">
                View more projects on Github!
              </div>
              <div
                href="https://github.com/krushil1"
                target="_blank"
                rel="noreferrer"
                className="mt-2"
              >
                <i class="bx bxl-github cursor-pointer text-gray text-4xl hover:text-lightgray"></i>
              </div>
            </div>

            <div>
              <img
                src={Picture}
                alt="work's pic"
                className="mr-auto w-3/4 sm:w-1/3 h-auto"
              />
            </div>

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-md"></div>
                <div className="modal-content shadow-effect bg-white p-10 sm:p-20 rounded-md relative flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-2xl mt-3 text-orange font-semibold">
                      {currentProject.name}
                    </p>

                    <div className="md:w-3/2 sm:w-96 text-md mt-2 text-gray font-medium">
                      <p>{currentProject.full_desc}</p>
                    </div>

                    <p className="text-lg text-gray mt-4 font-semibold">
                      Tech Used
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <hr className="w-full max-w-lg rounded-full border-gray" />
                      {currentProject.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className="text-orange text-3xl"
                          dangerouslySetInnerHTML={{ __html: tech }}
                        ></div>
                      ))}
                    </div>

                    <button
                      className="hover-bounce mt-4 rounded-full px-4 py-2 text-xl font-semibold text-gray shadow-lg"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
