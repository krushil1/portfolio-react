import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";
import sanityClient from "../../client";

export function Hero({ className, ...props }) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // First try to find any document with the description field
    console.log("Fetching hero description from Sanity...");

    // Try multiple possible document types and field names
    const possibleQueries = [
      `*[_type == "Home_About_Me"] { Home_About_Me_Text }`,
      `*[_type == "home_about_me"] { Home_About_Me_Text }`,
      `*[_type == "homeAboutMe"] { Home_About_Me_Text }`,
      `*[_type == "Home_Me_Text"] { Home_Me_Text }`,
      `*[_type == "Home_Text"] { Home_Text }`,
    ];

    // Try all possible queries
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

        // Find the first successful result with data
        for (let i = 0; i < results.length; i++) {
          if (results[i] && results[i].length > 0) {
            const data = results[i][0];
            console.log(`Found data with query ${i}:`, data);

            // Extract the text field (whatever it's called)
            const textField = Object.values(data)[0];
            if (textField) {
              console.log("Using description:", textField);
              setDescription(textField);
              setIsLoading(false);
              return;
            }
          }
        }

        // If we reach here, we couldn't find any data
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
        "flex flex-col items-start justify-center min-h-[80vh] w-full max-w-5xl mx-auto px-4 pt-36 md:pt-40 lg:pt-44",
        className
      )}
      {...props}
    >
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-4xl font-medium tracking-tight text-darkgray">
          Hey, I'm Krush<span className="text-orange">i</span>l 👋
        </h1>
        {isLoading ? (
          <p className="text-lg text-gray leading-relaxed">Loading...</p>
        ) : error ? (
          <p className="text-lg text-gray leading-relaxed">
            I'm a developer focused on building minimalist, functional, and
            accessible digital experiences.
          </p>
        ) : (
          <p className="text-lg text-gray leading-relaxed">{description}</p>
        )}
        <div className="flex items-center space-x-4 pt-2">
          <a
            href="#contact"
            className="px-4 py-2 bg-orange text-white rounded-md text-sm transition-colors hover:opacity-90"
          >
            Get in touch
          </a>
          <a
            href="#projects"
            className="px-4 py-2 bg-white text-gray rounded-md text-sm transition-colors hover:bg-muted"
          >
            View projects
          </a>
        </div>
      </div>
      <Separator className="my-24 bg-border" />
    </section>
  );
}
