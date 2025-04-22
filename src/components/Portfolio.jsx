import React from "react";
import { Header } from "./ui/Header";
import { Hero } from "./ui/Hero";
import { About } from "./ui/About";
import { Experience } from "./ui/Experience";
import { Projects } from "./ui/Projects";
import { Contact } from "./ui/Contact";
import { Footer } from "./ui/Footer";

export default function Portfolio() {
  return (
    <div className="min-h-screen text-darkgray font-sans gradient-section">
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
