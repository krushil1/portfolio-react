import React from "react";
import { cn } from "../../lib/utils";

export function Footer({ className, ...props }) {
  return (
    <footer
      className={cn(
        "w-full max-w-5xl mx-auto px-4 py-16 pt-8 pb-16 text-center text-sm text-gray",
        className
      )}
      {...props}
    >
      <p>
        © {new Date().getFullYear()} Krush<span className="text-orange">i</span>
        l. All rights reserved.
      </p>
      <p className="mt-3">
        Crafted with <span className="text-orange">❤️</span> using React,
        Tailwind CSS, and Sanity.
      </p>
    </footer>
  );
}
