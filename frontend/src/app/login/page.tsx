"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden border-r border-white/8 lg:flex">


          {/* bg-glow */}
          <div className="absolute -right-25 top-1/2 h-100 w-100 -translate-y-1/2 rounded-full bg-cyan-400/6 blur-[120px]" />

          <div className="relative flex w-full flex-col justify-center p-10 xl:p-14">
            <Link
              href="/"
              className="w-fit text-xl font-black tracking-[-0.06em]"
            >
              BG<span className="text-cyan-400">.</span>REMOVER
            </Link>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                <span className="h-px w-8 bg-cyan-400" />
                Welcome back
              </p>

              <h1 className="text-6xl font-black leading-[0.92] tracking-[-0.055em] xl:text-7xl">
                Your images.
                <br />
                Your workspace.
                <br />
                <span className="text-white/25">Your way.</span>
              </h1>

              <p className="mt-8 max-w-md text-sm leading-7 text-white/35">
                Sign in and continue creating clean, distraction-free images
                with BG.REMOVER.
              </p>
            </motion.div>


          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <Link
              href="/"
              className="mb-16 block w-fit text-lg font-black tracking-[-0.06em] lg:hidden"
            >
              BG<span className="text-cyan-400">.</span>REMOVER
            </Link>

            <div className="mb-10">
              <Link
                href="/"
                className="mb-8 hidden items-center gap-2 text-xs text-white/30 transition hover:text-cyan-400 sm:flex"
              >
                <ArrowLeft size={14} />
                Back to home
              </Link>

              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-cyan-400">
                ACCOUNT
              </p>

              <h2 className="text-4xl font-black tracking-[-0.04em]">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm text-white/35">
                Login to continue to your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-white/55"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-white/10 bg-white/2.5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-cyan-400/60 focus:bg-white/4"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-white/55"
                  >
                    Password
                  </label>
                </div>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full border border-white/10 bg-white/2.5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-cyan-400/60 focus:bg-white/4"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400"
                >
                  {error}
                </motion.p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 bg-cyan-400 px-4 py-3.5 text-sm font-bold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}

                {!loading && (
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-white/30">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-white transition hover:text-cyan-400"
              >
                Create one
              </Link>
            </p>

            <div className="mt-12 border-t border-white/[0.07] pt-5">
              <p className="text-center text-[11px] text-white/20">
                By continuing, you agree to use BG.REMOVER responsibly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
