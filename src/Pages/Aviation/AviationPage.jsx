import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import { Footer } from "../../components/ui/Footer";
import Masonry from "react-masonry-css";
import "./AviationPage.css";

export default function AviationPage() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "aviation-images"] {
            Title,
            image {
              asset-> {
                url,
                metadata {
                  dimensions
                }
              }
            }
          }`
        );
        setImages(data);
        if (data.length === 0) {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Configure responsive breakpoints for masonry - consistent columns for VSCO look
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 2, // Always 2 columns on mobile for authentic VSCO grid
    320: 2, // Maintain 2 columns even on small devices
  };

  return (
    <div className="min-h-screen text-darkgray gradient-section">
      <div className="relative z-10">
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <h2 className="text-xl font-medium text-darkgray">Aviation</h2>
            <a
              href="/"
              className="flex items-center px-3 py-1.5 border border-orange text-orange hover:bg-orange hover:text-white rounded-md transition-colors duration-200 text-sm font-medium"
            >
              <i className="bx bx-arrow-back mr-1.5"></i>
              Return Home
            </a>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-3 py-4">
          {isLoading ? (
            <div className="loading-container">
              <div className="text-gray flex flex-col items-center">
                <i className="bx bx-loader-alt text-3xl animate-spin text-orange mb-2"></i>
                <p>Loading images...</p>
              </div>
            </div>
          ) : error ? (
            <div className="loading-container">
              <div className="text-center p-6 border border-orange/20 rounded-lg bg-orange/5">
                <i className="bx bx-error-circle text-3xl text-orange mb-2"></i>
                <p className="text-orange">
                  Aviation images are currently unavailable. I'm working on
                  restoring them soon :)
                </p>
              </div>
            </div>
          ) : (
            <div className="masonry-container">
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {images.map((imageItem, index) => (
                  <div key={index} className="masonry-item">
                    <div className="image-wrapper">
                      <img
                        src={imageItem.image.asset.url}
                        alt={imageItem.Title || "Aviation image"}
                        className="image-hover-effect"
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <h3 className="text-white text-sm md:text-base">
                          {imageItem.Title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </Masonry>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
