import React, { useState, useEffect } from "react";
import client from "../../client";
import "./Aviation.css";

function Aviation() {
  const [imagedata, setImagedata] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "aviation-images"] {
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
      .then((data) => {
        setImagedata(data);
        if (data.length === 0) {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="font-medium text-xl text-orange p-4">
          Error fetching aviation images, please try again later.
        </div>
      </div>
    );
  }

  if (imagedata.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto masonry-grid md:mt-4">
      {imagedata.map((image, index) => {
        return (
          <div className="masonry-item" key={index}>
            <img src={image.image.asset.url} alt={image.Title} loading="lazy" />
            <div className="masonry-overlay">
              <div className="masonry-text">
                <h1 className="text-xs md:text-lg lg:text-lg font-bold">{image.Title}</h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Aviation;
