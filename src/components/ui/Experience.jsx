import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";
import sanityClient from "../../client";

export function Experience({ className, ...props }) {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "experience-data"] {
          Company_Name,
          image {
            asset-> {
              url
            }
          },
          Role,
          Location,
          Date,
          Icons_For_Tech_Used,
          Description,
          is_current
        }`
      )
      .then((data) => {
        const sortedData = [...data].sort((a, b) => {
          if (a.is_current && !b.is_current) return -1;
          if (!a.is_current && b.is_current) return 1;

          const aHasPresent = a.Date && a.Date.includes("Present");
          const bHasPresent = b.Date && b.Date.includes("Present");

          if (aHasPresent && !bHasPresent) return -1;
          if (!aHasPresent && bHasPresent) return 1;

          return 0;
        });

        setExperiences(sortedData);
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

  const isCurrentRole = (exp) => {
    return exp.is_current || (exp.Date && exp.Date.includes("Present"));
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const toggleExpanded = (index) => {
    setExpandedIds((prev) => {
      if (prev.includes(index)) {
        return prev.filter((id) => id !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const isExpanded = (index) => {
    return expandedIds.includes(index);
  };

  return (
    <section
      id="experience"
      className={cn(
        "w-full max-w-5xl mx-auto px-2 sm:px-3 md:px-4 py-8 sm:py-10 md:py-24 lg:py-32 mt-8 sm:mt-10 md:mt-16 lg:mt-20",
        className
      )}
      {...props}
    >
      <h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4 md:mb-10 lg:mb-12 text-orange">
        Experience
      </h2>

      {isLoading ? (
        <p className="text-gray">Loading experiences...</p>
      ) : error ? (
        <p className="text-orange">Experience data currently unavailable.</p>
      ) : (
        <div className="space-y-2 sm:space-y-3 md:space-y-5">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={cn(
                "group bg-white rounded-lg overflow-hidden transition-all duration-200",
                "border border-border hover:border-orange",
                "shadow-sm hover:shadow-md"
              )}
            >
              <div className="p-2 sm:p-2.5 md:p-4">
                <div className="flex flex-col gap-1.5 sm:gap-2 md:gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 bg-white rounded-md border border-border flex items-center justify-center overflow-hidden">
                        {exp.image && (
                          <img
                            src={exp.image.asset.url}
                            alt={exp.Company_Name}
                            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                        <h3 className="text-sm sm:text-base font-medium text-orange">
                          {exp.Company_Name}
                        </h3>
                        {isCurrentRole(exp) && (
                          <span className="inline-block px-1 sm:px-1.5 py-0.5 text-xs bg-orange/10 text-orange rounded-sm font-medium">
                            Current
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray mt-0.5">
                        <span className="font-medium text-darkgray">
                          {exp.Role}
                        </span>
                        {exp.Location && (
                          <span className="ml-1 sm:ml-1.5 md:ml-2 inline-flex items-center flex-wrap">
                            • <span className="text-xs mx-0.5 sm:mx-1">📍</span>
                            {exp.Location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-gray px-1 sm:px-1.5 py-0.5 bg-accent rounded-md self-start mb-1">
                      {exp.Date}
                    </span>

                    {exp.Description && (
                      <div className="mt-1 sm:mt-1.5 md:mt-2">
                        {exp.Description.length > 100 ? (
                          <>
                            <p className="text-xs sm:text-sm text-gray leading-relaxed">
                              {isExpanded(index)
                                ? exp.Description
                                : truncateText(exp.Description, 100)}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpanded(index);
                              }}
                              className="text-orange text-xs sm:text-sm hover:underline focus:outline-none mt-0.5 inline-block font-medium"
                            >
                              {isExpanded(index) ? "Show less" : "Read more"}
                            </button>
                          </>
                        ) : (
                          <p className="text-xs sm:text-sm text-gray leading-relaxed">
                            {exp.Description}
                          </p>
                        )}
                      </div>
                    )}

                    {exp.Icons_For_Tech_Used &&
                      exp.Icons_For_Tech_Used.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mt-1.5 sm:mt-2 md:mt-3">
                          {exp.Icons_For_Tech_Used.map((tech, i) => (
                            <div
                              key={i}
                              className="text-orange text-base sm:text-lg md:text-xl transform transition-transform hover:scale-110"
                              dangerouslySetInnerHTML={{ __html: tech }}
                              title="Technology used"
                            />
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Separator className="my-8 sm:my-12 md:my-24 lg:my-32 bg-gray/30 h-[2px]" />
    </section>
  );
}
