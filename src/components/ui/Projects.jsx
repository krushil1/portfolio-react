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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handleViewProject = (project) => {
    console.log("Opening modal for project:", project.Project_Name);
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
        "w-full max-w-5xl mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-24 lg:py-32 mt-10 sm:mt-16 md:mt-20 lg:mt-24",
        className
      )}
      {...props}
    >
      <h2 className="text-xl sm:text-2xl font-medium mb-6 sm:mb-8 md:mb-10 lg:mb-14 text-orange">
        Projects
      </h2>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={cn(
                "group bg-white rounded-lg overflow-hidden transition-all duration-200 card-highlight cursor-pointer",
                "border border-border hover:border-orange active:border-orange",
                "shadow-sm hover:shadow-md active:shadow-md"
              )}
              onClick={() => handleViewProject(project)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.Project_Name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleViewProject(project);
                }
              }}
            >
              <div className="p-4 sm:p-5">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h3 className="text-base font-medium text-orange">
                    {project.Project_Name}
                  </h3>

                  {project.Project_Link && (
                    <a
                      href={project.Project_Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray hover:text-orange transition-colors text-xl z-10 p-1"
                      aria-label="View on GitHub"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <i className="bx bxl-github"></i>
                    </a>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray mb-2 sm:mb-3 line-clamp-2">
                  {project.Sub_Description}
                </p>

                {project.Icons_For_Tech_Used &&
                  project.Icons_For_Tech_Used.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.Icons_For_Tech_Used.map((tech, i) => (
                        <div
                          key={i}
                          className="text-orange text-lg sm:text-xl"
                          dangerouslySetInnerHTML={{ __html: tech }}
                          title="Technology used"
                        />
                      ))}
                    </div>
                  )}

                <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray hover:text-orange transition-colors inline-flex items-center font-medium">
                  Details{" "}
                  <i className="bx bx-chevron-right ml-1 text-orange"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && currentProject && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[100] p-4 overflow-y-auto overscroll-contain"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          style={{
            animation: "fadeIn 0.2s ease-out forwards",
          }}
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            style={{
              animation: "fadeIn 0.2s ease-out forwards",
            }}
          ></div>
          <div
            className="bg-white rounded-lg shadow-xl relative z-[101] max-w-md w-full overflow-hidden mx-auto my-4"
            style={{
              animation: "scaleIn 0.2s ease-out forwards",
            }}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3
                id="project-modal-title"
                className="text-lg font-medium text-orange"
              >
                {currentProject.Project_Name}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray hover:text-orange transition-colors text-xl p-2 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
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

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      <Separator className="my-12 sm:my-16 md:my-24 lg:my-32 bg-gray/30 h-[2px]" />
    </section>
  );
}
