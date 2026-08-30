"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Arjun Mehta",
    role: "Designer",
    review:
      "Really simple to use. I can remove a background , add custom colors in a few seconds and get back to my work.",
  },
  {
    name: "Sarah Khan",
    role: "Content Creator",
    review:
      "The interface is clean and the whole process feels very straightforward.",
  },
  {
    name: "Daniel Roy",
    role: "Freelancer",
    review:
      "Exactly what I was looking for. Upload the image, remove the background , add background color and download it.",
  },
  {
    name: "Rohan Sharma",
    role: "Developer",
    review:
      "I like how focused the tool is. There are no unnecessary options getting in the way and good image enhancement.",
  },
  {
    name: "Emily Carter",
    role: "Product Designer",
    review:
      "A very clean experience. It takes almost no time to get the image ready for my designs.",
  },
  {
    name: "Aman Verma",
    role: "Photographer",
    review:
      "The workflow is simple and convenient. Uploading an image and getting the result is very easy.",
  },
];

export default function Reviews() {
  const [showMore, setShowMore] = useState(false);

  const visibleReviews = showMore ? reviews : reviews.slice(0, 3);

  return (
    <section className="px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-cyan-400">
              <span className="h-px w-8 bg-cyan-400" />
              REVIEWS
            </p>

            <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl">
              People who
              <br />
              <span className="text-cyan-400">keep creating.</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-6 text-white/35 md:text-right">
            A few words from people using BG.REMOVER in their everyday
            creative workflow.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleReviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="border border-white/10 p-6"
            >
              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="currentColor"
                    className="text-cyan-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-sm leading-6 text-white/60">
                &ldquo;{review.review}&ldquo;
              </p>

              {/* User */}
              <div className="mt-8">
                <p className="text-sm font-medium text-white">
                  {review.name}
                </p>

                <p className="mt-1 text-xs text-white/30">
                  {review.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More */}
        {reviews.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="border border-white/10 px-6 py-3 text-sm font-medium text-white/60 transition hover:border-cyan-400/40 hover:text-cyan-400 active:scale-95"
            >
              {showMore ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}