"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="px-4 py-32 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-130 overflow-hidden  border border-white/10">
              
              <Image
                src="/about.png"
                alt="BG Remover"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Futuristic frame */}
              <div className="absolute inset-8 border border-white/10" />

              {/* Corner */}
              <div className="absolute right-7 top-7 h-12 w-12 border-r border-t border-cyan-400/50" />

              {/* Bottom text */}
              <div className="absolute bottom-7 left-7">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                  BG.REMOVER
                </p>

                <p className="mt-2 text-sm text-white/70">
                  Simple tools. Clean results.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              About
            </p>

            <h2 className="text-4xl font-black leading-none tracking-[-0.04em] sm:text-6xl">
              Good tools
              <br />
              should stay
              <br />
              <span className="text-white/30">
                out of your way.
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/40">
              BG.REMOVER is built around a straightforward idea:
              background removal should not require a complicated
              editor or a long workflow.
            </p>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/40">
              Upload your image, remove what you don&apos;t need and
              continue creating.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}