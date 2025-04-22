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
        // Sort experiences to show current position first
        const sortedData = [...data].sort((a, b) => {
          // First by is_current (if available)
          if (a.is_current && !b.is_current) return -1;
          if (!a.is_current && b.is_current) return 1;

          // Then try to determine by date containing "Present"
          const aHasPresent = a.Date && a.Date.includes("Present");
          const bHasPresent = b.Date && b.Date.includes("Present");

          if (aHasPresent && !bHasPresent) return -1;
          if (!aHasPresent && bHasPresent) return 1;

          // Default to original order
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

  // Function to check if a role is current
  const isCurrentRole = (exp) => {
    return exp.is_current || (exp.Date && exp.Date.includes("Present"));
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Toggle description expand/collapse
  const toggleExpanded = (index) => {
    setExpandedIds((prev) => {
      if (prev.includes(index)) {
        return prev.filter((id) => id !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Check if an experience is expanded
  const isExpanded = (index) => {
    return expandedIds.includes(index);
  };

  return (
    <section
      id="experience"
      className={cn(
        "w-full max-w-5xl mx-auto px-4 py-20 mt-16 md:mt-20",
        className
      )}
      {...props}
    >
      <h2 className="text-2xl font-medium mb-8 text-orange">Experience 💼</h2>

      {isLoading ? (
        <p className="text-gray">Loading experiences...</p>
      ) : error ? (
        <p className="text-orange">Experience data currently unavailable.</p>
      ) : (
        <div className="space-y-5">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={cn(
                "group bg-white rounded-lg overflow-hidden transition-all duration-200",
                "border border-border hover:border-orange",
                "shadow-sm hover:shadow-md"
              )}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 bg-white rounded-md border border-border flex items-center justify-center overflow-hidden">
                      {exp.image && (
                        <img
                          src={exp.image.asset.url}
                          alt={exp.Company_Name}
                          className="h-10 w-10 object-contain"
                        />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between items-start mb-1">
                      <div>
                        <h3 className="text-base font-medium text-orange">
                          {exp.Company_Name}
                          {isCurrentRole(exp) && (
                            <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-orange/10 text-orange rounded-sm font-medium">
                              Current
                            </span>
                          )}
                        </h3>

                        <div className="flex items-center text-sm text-gray">
                          <span className="font-medium text-darkgray">
                            {exp.Role}
                          </span>
                          {exp.Location && (
                            <span className="ml-2 inline-flex items-center">
                              • <span className="text-xs mx-1">📍</span>
                              {exp.Location}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-xs text-gray px-2 py-1 bg-accent rounded-md">
                        {exp.Date}
                      </span>
                    </div>

                    {/* Description */}
                    {exp.Description && (
                      <div className="mt-2">
                        {exp.Description.length > 100 ? (
                          <>
                            <p className="text-sm text-gray leading-relaxed">
                              {isExpanded(index)
                                ? exp.Description
                                : truncateText(exp.Description, 100)}
                            </p>
                            <button
                              onClick={() => toggleExpanded(index)}
                              className="text-orange text-sm hover:underline focus:outline-none mt-1 inline-block font-medium"
                            >
                              {isExpanded(index) ? "Show less" : "Read more"}
                            </button>
                          </>
                        ) : (
                          <p className="text-sm text-gray leading-relaxed">
                            {exp.Description}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Technologies */}
                    {exp.Icons_For_Tech_Used &&
                      exp.Icons_For_Tech_Used.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {exp.Icons_For_Tech_Used.map((tech, i) => (
                            <div
                              key={i}
                              className="text-orange text-xl transform transition-transform hover:scale-110"
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

      <Separator className="my-24 bg-border" />
    </section>
  );
}
