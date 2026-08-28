"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eraser, Flame, Play, Zap } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:pt-36">
      <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — Content */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            <span className="h-px w-8 bg-cyan-400" />
            Background removal made simple
          </p>

          <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-7xl lg:text-[78px]">
            Remove the
            <br />
            <span className="text-white/35">background.</span>
            <br />
            Keep the <span className="text-cyan-400">subject.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-white/45 sm:text-lg">
            Turn ordinary images into clean, transparent visuals. Upload an
            image, remove the background, and get a ready-to-use result in
            seconds.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="/remove-background"
              className="group flex items-center gap-3 bg-cyan-400 px-6 py-3.5 text-sm font-bold text-black transition hover:bg-cyan-300 active:scale-95"
            >
              Remove Background
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#how-it-works"
              className="group flex items-center gap-2 border border-white/10 px-5 py-3.5 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white active:scale-95"
            >
              <Play size={14} className="fill-current" />
              See how it works
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-white/8 pt-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-white" />
                <p className="text-sm font-semibold text-white">Fast</p>
              </div>
              <p className="mt-1 text-xs text-white/30">Simple workflow</p>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Eraser className="h-4 w-4 text-white" />
                <p className="text-sm font-semibold text-white">Clean</p>
              </div>
              <p className="mt-1 text-xs text-white/30">Transparent output</p>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-white" />
                <p className="text-sm font-semibold text-white">Easy</p>
              </div>
              <p className="mt-1 text-xs text-white/30">No editing skills</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT*/}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative mx-auto max-w-145">
            <div className="relative aspect-4/5 overflow-hidden border border-white/10 bg-[#0b0e14]">
              <Image
                src="/during.png"
                width={600}
                height={750}
                alt="Background removal preview"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating result image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-7 -left-7 w-52 border border-white/10 bg-[#080b10]/95 p-3 shadow-2xl backdrop-blur-xl sm:w-60"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[linear-gradient(45deg,#151922_25%,transparent_25%),linear-gradient(-45deg,#151922_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#151922_75%),linear-gradient(-45deg,transparent_75%,#151922_75%)] bg-position-[0_0,0_6px,6px_-6px,-6px_0] bg-size-[12px_12px]">
                <Image
                  src="/after.png"
                  width={600}
                  height={450}
                  alt="Background removed result"
                  className="h-full w-full object-contain"
                />

                <div className="absolute bottom-2 left-2 bg-cyan-400 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
                  Removed
                </div>
              </div>
            </motion.div>

            {/* Floating original image */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-7 -top-7 w-fit border border-white/10 bg-[#080b10]/95 p-3 shadow-2xl backdrop-blur-xl"
            >
              <div className="relative h-45 w-33.75 overflow-hidden bg-[#11141a]">
                <Image
                  src="/before.png"
                  width={600}
                  height={450}
                  alt="Original image"
                  className="h-full w-full object-cover"
                />

                <div className="absolute right-2 top-2 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
                  Original
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
