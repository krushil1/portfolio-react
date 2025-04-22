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
        "w-full max-w-5xl mx-auto px-4 py-20 mt-16 md:mt-20",
        className
      )}
      {...props}
    >
      <h2 className="text-2xl font-medium mb-8 text-orange">About Me 🧠</h2>

      {isLoading ? (
        <p className="text-gray">Loading...</p>
      ) : error ? (
        <p className="text-orange">About me data currently unavailable.</p>
      ) : (
        <div className="max-w-3xl">
          <div className="text-md text-gray mb-6">
            <i className="bx bxs-map-pin text-orange mr-1"></i> Pennsylvania
          </div>

          <div className="space-y-5">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="text-gray leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="/aviation"
              className="inline-flex items-center px-4 py-2 border border-orange text-orange hover:bg-orange hover:text-white rounded-md transition-colors"
            >
              <i className="bx bxs-plane-take-off mr-2"></i>
              <span>View aviation photography</span>
            </a>
          </div>
        </div>
      )}

      <Separator className="my-24 bg-border" />
    </section>
  );
}
