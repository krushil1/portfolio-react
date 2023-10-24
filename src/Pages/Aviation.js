import React, { useState, useEffect } from "react";
import client from "../client";
import Grid from "@mui/material/Grid";

function Aviation() {
  const [imagedata, setImagedata] = useState([]);

  useEffect(() => {
    // Fetch data from sanity
    client
      .fetch(
        `*[_type == "images"] {
            Title,
            image {
                asset-> {
                    url,
                    metadata {
                      dimensions
                    }
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

  return (
    <div className="container mx-auto">
      <Grid container spacing={2}>
        {imagedata.map((image, index) => {
          const { width, height } = image.image.asset.metadata.dimensions;
          const maxWidth = 300; // Adjust the maximum width as needed
          const maxHeight = 400; // Adjust the maximum height as needed

          const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
          const scaledWidth = width * scaleFactor;
          const scaledHeight = height * scaleFactor;

          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <div
                className="relative mb-2"
                style={{
                  gridColumn: `span ${Math.ceil(maxWidth / scaledWidth)}`,
                  gridRow: `span ${Math.ceil(maxHeight / scaledHeight)}`,
                }}
              >
                <img
                  src={image.image.asset.url}
                  alt={image.Title}
                  style={{
                    width: `${scaledWidth}px`,
                    height: `${scaledHeight}px`,
                  }}
                  className="w-full object-cover aspect-none h-auto"
                />
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 py-2 px-4">
                  <h1 className="text-white text-lg font-bold text-left">
                    {image.Title}
                  </h1>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Aviation;
