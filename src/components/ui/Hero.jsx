import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";
import sanityClient from "../../client";

export function Hero({ className, ...props }) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("Fetching hero description from Sanity...");

    const possibleQueries = [
      `*[_type == "Home_About_Me"] { Home_About_Me_Text }`,
      `*[_type == "home_about_me"] { Home_About_Me_Text }`,
      `*[_type == "homeAboutMe"] { Home_About_Me_Text }`,
      `*[_type == "Home_Me_Text"] { Home_Me_Text }`,
      `*[_type == "Home_Text"] { Home_Text }`,
    ];

    Promise.all(
      possibleQueries.map((query) =>
        sanityClient.fetch(query).catch((err) => {
          console.log(`Query failed: ${query}`, err.message);
          return [];
        })
      )
    )
      .then((results) => {
        console.log("Sanity query results:", results);

        for (let i = 0; i < results.length; i++) {
          if (results[i] && results[i].length > 0) {
            const data = results[i][0];
            console.log(`Found data with query ${i}:`, data);

            const textField = Object.values(data)[0];
            if (textField) {
              console.log("Using description:", textField);
              setDescription(textField);
              setIsLoading(false);
              return;
            }
          }
        }

        console.log("No hero description found in any query");
        setError(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hero description:", err);
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <section
      className={cn(
        "flex flex-col items-start justify-center min-h-[95vh] sm:min-h-[90vh] w-full max-w-5xl mx-auto px-3 sm:px-4 pt-44 sm:pt-52 md:pt-64 lg:pt-72",
        className
      )}
      {...props}
    >
      <div className="space-y-4 sm:space-y-6 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-gray">
          Hey, I'm Krush<span className="text-orange">i</span>l 👋
        </h1>
        {isLoading ? (
          <p className="text-base sm:text-lg text-gray leading-relaxed">
            Loading...
          </p>
        ) : error ? (
          <p className="text-base sm:text-lg text-gray leading-relaxed">
            I'm a developer focused on building minimalist, functional, and
            accessible digital experiences.
          </p>
        ) : (
          <p className="text-base sm:text-lg text-gray leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex items-center space-x-3 sm:space-x-4 pt-2 sm:pt-4">
          <a
            href="#contact"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange text-white rounded-md text-sm transition-colors hover:opacity-90"
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-gray rounded-md text-sm transition-colors hover:bg-muted"
          >
            View projects
          </a>
        </div>
      </div>
      <Separator className="my-16 sm:my-20 md:my-24 lg:my-32 bg-gray/30 h-[2px]" />
    </section>
  );
}
