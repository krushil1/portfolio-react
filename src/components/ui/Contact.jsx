import React from "react";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";

export function Contact({ className, ...props }) {
  return (
    <section
      id="contact"
      className={cn(
        "w-full max-w-5xl mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-24 lg:py-32 mt-10 sm:mt-14 md:mt-20 lg:mt-24",
        className
      )}
      {...props}
    >
      <h2 className="text-xl sm:text-2xl font-medium mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-orange">
        Contact 📬
      </h2>
      <div className="max-w-md">
        <p className="text-sm sm:text-base text-gray leading-relaxed mb-6 sm:mb-8">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>

        <div className="flex items-center space-x-6 sm:space-x-8 mb-4">
          <a
            href="mailto:connect@krushil.dev"
            className="text-darkgray hover:text-orange transition-colors"
            aria-label="Email"
          >
            <i className="bx bxs-envelope text-xl sm:text-2xl"></i>
          </a>

          <a
            href="https://github.com/krushil1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkgray hover:text-orange transition-colors"
            aria-label="GitHub"
          >
            <i className="bx bxl-github text-xl sm:text-2xl"></i>
          </a>

          <a
            href="https://linkedin.com/in/krushil-amrutiya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkgray hover:text-orange transition-colors"
            aria-label="LinkedIn"
          >
            <i className="bx bxl-linkedin text-xl sm:text-2xl"></i>
          </a>

          <a
            href="https://x.com/krushil_a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkgray hover:text-orange transition-colors"
            aria-label="X (formerly Twitter)"
          >
            <span className="font-bold text-xl sm:text-2xl">𝕏</span>
          </a>
        </div>
      </div>
      <Separator className="my-12 sm:my-16 md:my-24 lg:my-32 bg-gray/30 h-[2px]" />
    </section>
  );
}
