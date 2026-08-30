"use client";

import { motion } from "framer-motion";
import { Upload, Wand2, Download, Palette } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your image",
    text: "Choose an image from your device. No complicated setup required.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "Remove the background",
    text: "Let the background removal engine separate your subject from the image.",
  },
  {
    number: "03",
    icon: Palette ,
    title: "Choose custom background color",
    text: "Select a background color of your choice to replace the removed background.",
  },
  {
    number: "04",
    icon: Download,
    title: "Download the result",
    text: "Get your transparent image and use it wherever you need.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Heading */}
          <div>
            <p className="mb-5 gap-3 text-xs font-semibold  tracking-[0.25em] text-cyan-400">
              HOW IT WORKS
            </p>

            <h2 className="max-w-md text-4xl font-black leading-none tracking-[-0.04em] sm:text-6xl">
              From image
              <br />
              to transparent
              <br />
              in <span className="text-cyan-400">three steps.</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="border-t border-white/10">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="grid gap-5 border-b border-white/10 py-8 sm:grid-cols-[70px_50px_1fr] sm:items-start"
                >
                  <span className="text-xs font-bold tracking-widest text-white/25">
                    {step.number}
                  </span>

                  <Icon
                    size={21}
                    strokeWidth={1.7}
                    className="text-cyan-400"
                  />

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/40">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}