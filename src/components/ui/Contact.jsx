import React from "react";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";

export function Contact({ className, ...props }) {
  return (
    <section
      id="contact"
      className={cn(
        "w-full max-w-5xl mx-auto px-4 py-20 mt-16 md:mt-20",
        className
      )}
      {...props}
    >
      <h2 className="text-2xl font-medium mb-10 text-orange">Contact 📬</h2>
      <div className="max-w-md">
        <p className="text-gray leading-relaxed mb-8">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </p>

        <div className="flex items-center space-x-8 mb-4">
          <a
            href="mailto:connect@krushil.dev"
            className="text-darkgray hover:text-orange transition-colors"
            aria-label="Email"
          >
            <i className="bx bx-envelope text-2xl"></i>
          </a>

          <a
            href="https://github.com/krushil1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkgray hover:text-orange transition-colors"
            aria-label="GitHub"
          >
            <i className="bx bxl-github text-2xl"></i>
          </a>

          <a
            href="https://linkedin.com/in/krushil-amrutiya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkgray hover:text-orange transition-colors"
            aria-label="LinkedIn"
          >
            <i className="bx bxl-linkedin text-2xl"></i>
          </a>

          <a
            href="https://x.com/krushil_a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-darkgray hover:text-orange transition-colors"
            aria-label="X (formerly Twitter)"
          >
            <span className="font-bold text-2xl">𝕏</span>
          </a>
        </div>
      </div>
      <Separator className="my-24 bg-border" />
    </section>
  );
}
