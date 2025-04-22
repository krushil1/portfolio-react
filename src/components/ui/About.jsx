import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";
import sanityClient from "../../client";

export function About({ className, ...props }) {
  const [aboutText, setAboutText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "About_Me_Text"] {
          About_Me_Text,
        }`
      )
      .then((data) => {
        if (data.length > 0) {
          setAboutText(data[0].About_Me_Text);
        } else {
          setError(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setIsLoading(false);
      });
  }, []);

  const aboutParagraphs = aboutText
    ? aboutText.split("\n\n").filter((p) => p.trim())
    : [];

  return (
    <section
      id="about"
      className={cn(
        "w-full max-w-5xl mx-auto px-3 sm:px-4 py-10 sm:py-16 md:py-24 lg:py-32 mt-10 sm:mt-12 md:mt-16 lg:mt-20",
        className
      )}
      {...props}
    >
      <h2 className="text-xl sm:text-2xl font-medium mb-5 sm:mb-6 md:mb-10 lg:mb-12 text-orange">
        About Me
      </h2>

      {isLoading ? (
        <p className="text-gray">Loading...</p>
      ) : error ? (
        <p className="text-orange">About me data currently unavailable.</p>
      ) : (
        <div className="max-w-3xl">
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-gray leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10">
            <a
              href="/aviation"
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-orange text-orange hover:bg-orange hover:text-white rounded-md transition-colors text-sm"
            >
              <i className="bx bxs-plane-take-off mr-1.5 sm:mr-2"></i>
              <span>View aviation photography</span>
            </a>
          </div>
        </div>
      )}

      <Separator className="my-12 sm:my-16 md:my-24 lg:my-32 bg-gray/30 h-[2px]" />
    </section>
  );
}
