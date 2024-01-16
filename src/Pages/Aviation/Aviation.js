import React, { useState, useEffect } from "react";
import client from "../../client";
import "./Aviation.css";
import LoadingGIF from "./loading.gif";

function Aviation() {
  const [imagedata, setImagedata] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    const fetchData = async () => {
      try {
        const data = await client.fetch(
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
        );
        setImagedata(data);
        if (data.length === 0) {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    // Delay fetching data for 3 seconds (adjust as needed)
    const timer = setTimeout(fetchData, 3000);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Preload images in the background once loading is complete
      imagedata.forEach((image) => {
        const img = new Image();
        img.src = image.image.asset.url;
      });
    }
  }, [loading, imagedata]);

  const containerStyle = {
    opacity: loading ? 0 : 1, // Set opacity to 0 during loading and 1 when images are ready
    transition: "opacity 0.5s ease-in-out", // Add a smooth fade-in transition
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="font-medium text-xl text-white p-4">
          <p className="text-orange uppercase">Loading....</p>
          <img src={LoadingGIF} width="350px" height="auto" alt="Loading..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="font-medium text-xl text-orange p-4">
          Error fetching aviation images, please try again later.
        </div>
      </div>
    );
  }

  if (imagedata.length === 0 && !loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="font-medium text-xl text-orange p-4">
          No aviation images available.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto masonry-grid md:mt-4" style={containerStyle}>
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
