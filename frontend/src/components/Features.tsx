"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Download, ImagePlus, Palette } from "lucide-react";

const features = [
  {
    icon: ImagePlus,
    title: "Background Removal",
    description:
      "Remove image backgrounds quickly and get a clean, transparent result with just a few clicks.",
  },
  {
    icon: BadgeCheck,
    title: "Completely Free",
    description:
      "Remove backgrounds and enhance your images without paying for every image you process.",
  },
  {
    icon: Palette,
    title: "Custom Background Colors",
    description:
      "Choose from preset colors or pick your own custom color to give your image the perfect background.",
  },
  {
    icon: Download,
    title: "Easy Image Export",
    description:
      "Download your finished image with your selected background as a high-quality PNG file.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-4 py-32 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-4 text-xs font-semibold  tracking-[0.25em] text-cyan-400">
            FEATURES
          </p>

          <h2 className="text-4xl font-black leading-none tracking-[-0.04em] sm:text-6xl">
            Everything you need to
            <span className="text-cyan-400"> perfect your images.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/40">
            Powerful image tools designed to make background removal and image
            editing simple, fast, and accessible.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -4 }}
                className="group relative bg-[#080808] p-7 transition-colors duration-300"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative mb-8 flex h-12 w-12 items-center justify-center border border-white/10 text-cyan-400 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/5">
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Number */}
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/20">
                  0{index + 1}
                </p>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/35">
                  {feature.description}
                </p>

                {/* Bottom Line */}
                <div className="mt-7 h-px w-8 bg-white/10 transition-all duration-300 group-hover:w-14 group-hover:bg-cyan-400/60" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
