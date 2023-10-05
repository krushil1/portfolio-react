import React, { useEffect, useState } from "react";
import Picture from "../assets/pic.jpeg";

function Home() {
  const [arrowUp, setArrowUp] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setArrowUp((prevArrowUp) => !prevArrowUp);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto" id="home">
      <div className="sm:flex justify-center items-center min-h-screen bg-white-100 px-6 md:px-24 py-20">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-left">
            <h1 className="mt-12 text-4xl sm:text-6xl text-gray font-bold leading-tight mb-4">
              Hi,
              <br />
              I'm <span className="text-orange text-shadow-sm">Krushil</span>
            </h1>
            <h2 className="text-1xl sm:text-2xl font-medium text-gray">
              Breaking & building tech sometimes
            </h2>
          </div>
          <div>
            <button
              onClick={scrollToContact}
              className="bg-orange font-bold text-white px-8 py-3 rounded-full hover:bg-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Get In Touch
            </button>
          </div>
          <div className="flex space-x-6 sm:mt-5">
            <a href="https://linkedin.com">
              <i className="bx bxl-linkedin text-gray text-2xl hover:text-lightgray"></i>
            </a>
            <a href="https://github.com">
              <i className="bx bxl-github text-gray text-2xl hover:text-lightgray"></i>
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img
            src={Picture}
            alt="Krushil's img"
            className="ml-16 w-3/4 h-auto mt-12 sm:w-auto sm:h-auto lg:w-96 lg:h-auto object-cover object-center rounded-md shadow-lg"
          />
          <i
            className={`text-orange mt-10 text-2xl bx bxs-chevron-down sm:hidden ${
              arrowUp ? "animate-bounce-up-down" : ""
            }`}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Home;
