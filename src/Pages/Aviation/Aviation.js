import React, { useState, useEffect } from "react";
import client from "../../client";
import "./Aviation.css";

function Aviation() {
  const [imagedata, setImagedata] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchData(); // Fetch data without delay

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="font-medium text-xl text-white p-4">
          <p className="text-orange uppercase">Loading....</p>
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
    <div className="container mx-auto masonry-grid md:mt-4">
      {imagedata.map((image, index) => (
        <div className="masonry-item" key={index}>
          <img src={image.image.asset.url} alt={image.Title} />
          <div className="masonry-overlay">
            <div className="masonry-text">
              <h1 className="text-xs md:text-lg lg:text-lg font-bold">{image.Title}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Aviation;
