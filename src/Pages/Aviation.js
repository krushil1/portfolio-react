import React, { useState, useEffect } from "react";
import client from "../client";

function Aviation() {
  const [imagedata, setImagedata] = useState([]);

  useEffect(() => {

    // fetch data from sanity
    client
      .fetch(
        `*[_type == "images"] {
            Title,
            image {
                asset-> {
                    url
                },
            }
        }`
      )
      .then((data) => setImagedata(data))
      .catch(console.error);
  }, []);

  // Calculate the number of columns based on screen width
  const calculateColumns = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      return 4; // Large screens, 4 columns
    } else if (screenWidth >= 768) {
      return 2; // Medium screens, 2 columns
    } else {
      return 1; // Small screens (mobile), 1 column
    }
  };

  // Define the CSS grid style based on the number of columns
  const gridStyle = {
    gridTemplateColumns: `repeat(${calculateColumns()}, 1fr)`,
    gap: "1rem",
  };

  return (
    <div className="container mx-auto">
      <div className="grid" style={gridStyle}>
        {imagedata.map((image, index) => (
          <div key={index} className="relative mb-2">

            <img
              src={image.image.asset.url}
              alt={image.Title}
              className="w-full object-cover aspect-none h-auto"
            />

            <div className="absolute top-0 left-0 bg-black bg-opacity-50 py-2 px-4">
              <h1 className="text-white text-lg font-bold text-left">
                {image.Title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Aviation;
