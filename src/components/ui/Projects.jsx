import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";
import sanityClient from "../../client";

export function Projects({ className, ...props }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "projects"] {
          Project_Name,
          Project_Link,
          Project_Link_Icon,
          Description,
          Sub_Description,
          Icons_For_Tech_Used
        }`
      )
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
        if (data.length === 0) {
          setError(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setError(true);
      });
  }, []);

  const handleViewProject = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentProject(null);
    setShowModal(false);
  };

  return (
    <section
      id="projects"
      className={cn(
        "w-full max-w-5xl mx-auto px-4 py-20 mt-16 md:mt-20",
        className
      )}
      {...props}
    >
      <h2 className="text-2xl font-medium mb-10 text-orange">Projects 🚀</h2>
      {isLoading ? (
        <div className="flex justify-center py-6">
          <p className="text-gray">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center py-6">
          <p className="text-orange text-center">
            Projects are currently unavailable.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={cn(
                "group bg-white rounded-lg overflow-hidden transition-all duration-200 card-highlight",
                "border border-border hover:border-orange",
                "shadow-sm hover:shadow-md"
              )}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-medium text-orange">
                    {project.Project_Name}
                  </h3>

                  {project.Project_Link && (
                    <a
                      href={project.Project_Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray hover:text-orange transition-colors text-xl"
                      aria-label="View on GitHub"
                    >
                      <i className="bx bxl-github"></i>
                    </a>
                  )}
                </div>

                <p className="text-sm text-gray mb-3 line-clamp-2">
                  {project.Sub_Description}
                </p>

                {project.Icons_For_Tech_Used &&
                  project.Icons_For_Tech_Used.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.Icons_For_Tech_Used.map((tech, i) => (
                        <div
                          key={i}
                          className="text-orange text-xl"
                          dangerouslySetInnerHTML={{ __html: tech }}
                          title="Technology used"
                        />
                      ))}
                    </div>
                  )}

                <button
                  onClick={() => handleViewProject(project)}
                  className="mt-4 text-sm text-gray hover:text-orange transition-colors inline-flex items-center"
                >
                  Details{" "}
                  <i className="bx bx-chevron-right ml-1 text-orange"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-lg shadow-lg relative z-10 max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-medium text-orange">
                {currentProject.Project_Name}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray hover:text-orange transition-colors text-xl"
                aria-label="Close"
              >
                <i className="bx bx-x"></i>
              </button>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-sm text-gray leading-relaxed">
                {currentProject.Description}
              </p>

              {currentProject.Icons_For_Tech_Used &&
                currentProject.Icons_For_Tech_Used.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray font-medium mb-2">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {currentProject.Icons_For_Tech_Used.map((tech, i) => (
                        <div
                          key={i}
                          className="text-orange text-2xl"
                          dangerouslySetInnerHTML={{ __html: tech }}
                        />
                      ))}
                    </div>
                  </div>
                )}

              {currentProject.Project_Link && (
                <div className="pt-2">
                  <a
                    href={currentProject.Project_Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm bg-accent hover:bg-accent/80 text-darkgray px-4 py-2 rounded-md transition-colors"
                  >
                    <i className="bx bxl-github mr-2"></i> View on GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Separator className="my-24 bg-border" />
    </section>
  );
}
