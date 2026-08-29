import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Top */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="w-fit text-xl font-black tracking-[-0.06em] text-white"
          >
            BG<span className="text-cyan-400">.</span>REMOVER
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="#how-it-works"
              className="text-xs text-white/35 transition hover:text-cyan-400"
            >
              How It Works
            </Link>

            <Link
              href="#about"
              className="text-xs text-white/35 transition hover:text-cyan-400"
            >
              About
            </Link>

            <Link
              href="/login"
              className="text-xs text-white/35 transition hover:text-cyan-400"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-white/6" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright */}
          <p className="text-xs text-white/20">
            © 2026 BG.REMOVER
          </p>

          {/* Made by */}
          <p className="flex items-center justify-center gap-1 text-xs text-white/30">
            Made with
            <Heart
              size={14}
              className="fill-cyan-400 text-cyan-400 animate-pulse"
            />
            by
            <span className="font-medium text-white/50">
              Shuhel Ahmed
            </span>
          </p>

          {/* Links */}
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://github.com/Shuhel15"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 transition hover:text-cyan-400"
            >
              GitHub
            </a>

            <a
              href="https://shuhel.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 transition hover:text-cyan-400"
            >
              Portfolio
            </a>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-6 text-center">
          <p className="text-[11px] tracking-wide text-white/15">
            Remove. Create. Repeat.
          </p>
        </div>
      </div>
    </footer>
  );
}