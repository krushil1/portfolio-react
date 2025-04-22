import React, { useEffect, useState } from "react";
import client from "../../client";

function Resume() {
  const [resume, setResume] = useState("");
  const [resumeTitle, setResumeTitle] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "resume-image"] {
          Title,
          image {
            asset-> {
              url
            }
          }
        }`
      )
      .then((data) => {
        if (data.length > 0) {
          setResume(data[0].image.asset.url);
          setResumeTitle(data[0].Title);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <div className="h-full-screen flex justify-center items-center bg-white">
      <img
        src={resume}
        alt={resumeTitle}
        className="max-h-screen max-w-screen mx-auto"
      />
    </div>
  );
}

export default Resume;
