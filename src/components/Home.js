import React from 'react';
import Image from '../assets/pic.jpeg';

function Home() {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center min-h-screen bg-white-100 px-6 md:px-24 py-20">
                <div className="max-w-4xl w-full space-y-12">
                    <div className="text-left">
                        <h1 className="text-6xl text-gray font-bold leading-tight mb-4">Hi,<br />I'm <span className="text-orange text-shadow-sm">Krushil</span></h1>
                        <h2 className="text-2xl font-medium text-gray">Breaking & building tech sometimes</h2>
                    </div>
                    <div>
                        <button className="bg-orange font-bold text-white px-8 py-3 rounded-full hover:bg-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-opacity-50 transition duration-150 ease-in-out">
                            Get In Touch
                        </button>
                    </div>
                    <div className="flex space-x-6">
                        <a href="https://linkedin.com"><i className="bx bxl-linkedin text-gray text-2xl hover:text-lightgray"></i></a>
                        <a href="https://github.com"><i className="bx bxl-github text-gray text-2xl hover:text-lightgray"></i></a>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <img alt="Krushil's picture" src={Image} className="ml-16 w-100 h-100 object-cover object-center rounded-md shadow-lg" />
                </div>
            </div>
        </div>
    );
}

export default Home;
