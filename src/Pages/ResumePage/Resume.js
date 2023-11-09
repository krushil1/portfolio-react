import React from 'react';

import resume from "../ResumePage/resume.jpeg"

function Resume() {
  return (
    <div className="h-full-screen flex justify-center items-center">
      <img
        src={resume} 
        alt="Resume"
        className="max-h-screen max-w-screen mx-auto"
      />
    </div>
  );
}

export default Resume;
