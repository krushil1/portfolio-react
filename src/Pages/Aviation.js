// import React, { useState, useEffect } from "react";
// import client from "../client";
// import "./Aviation.css";

// function Aviation() {
//   const [imagedata, setImagedata] = useState([]);

//   useEffect(() => {
//     client
//       .fetch(
//         `*[_type == "images"] {
//             Title,
//             image {
//                 asset-> {
//                     url,
//                     metadata {
//                       dimensions
//                     }
//                 },
//             }
//         }`
//       )
//       .then((data) => {
//         setImagedata(data);
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="container mx-auto masonry-grid">
//       {imagedata.map((image, index) => {
//         return (
//           <div className="masonry-item" key={index}>
//             <img
//               src={image.image.asset.url}
//               alt={image.Title}
//             />
//             <div className="masonry-overlay">
//               <div className="masonry-text">
//                 <h1 className="text-lg font-bold">{image.Title}</h1>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Aviation;


import React, { useState, useEffect } from "react";
import client from "../client";
import "./Aviation.css"; // Import your CSS file

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
      .then((data) => {
        setImagedata(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="container mx-auto masonry-grid">
      {imagedata.map((image, index) => {
        return (
          <div className="masonry-item" key={index}>
            <img
              src={image.image.asset.url}
              alt={image.Title}
            />
            <div className="masonry-overlay">
              <div className="masonry-text">
                <h1 className="text-lg font-bold">{image.Title}</h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Aviation;
