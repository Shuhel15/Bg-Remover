"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl border border-white/10 px-6 py-16 sm:px-12 sm:py-20"
      >
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.25em] text-cyan-400">
              START CREATING
            </p>

            <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl">
              Your next image
              <br />
              starts <span className="text-white/35">here.</span>
            </h2>
            <p className="text-sm text-white/35 mt-4">
              No credit card required. Start creating for free.
            </p>
          </div>

          <a
            href="/remove-background"
            className="group flex w-fit items-center gap-3 bg-cyan-400 px-6 py-4 text-sm font-bold text-black transition hover:bg-cyan-300 active:scale-95"
          >
            Remove Background
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
