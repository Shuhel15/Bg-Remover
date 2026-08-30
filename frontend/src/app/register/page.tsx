"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden border-r border-white/8 lg:flex">
        

          {/* bg-glow */}
          <div className="absolute -right-25 top-1/2 h-100 w-100 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[120px]" />

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
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.25em] text-cyan-400">
                <span className="h-px w-8 bg-cyan-400" />
                CREATE YOUR ACCOUNT
              </p>

              <h1 className="text-6xl font-black leading-[0.92] tracking-[-0.055em] xl:text-7xl">
                Start with
                <br />
                a clean
                <br />
                <span className="text-white/25">canvas.</span>
              </h1>

              <p className="mt-8 max-w-md text-sm leading-7 text-white/35">
                Create your BG.REMOVER account and get a simple workspace for
                turning ordinary images into clean visuals.
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

            {/* Mobile Logo */}
            <Link
              href="/"
              className="mb-14 block w-fit text-lg font-black tracking-[-0.06em] lg:hidden"
            >
              BG<span className="text-cyan-400">.</span>REMOVER
            </Link>

            <div className="mb-9">
              <Link
                href="/"
                className="mb-8 hidden items-center gap-2 text-xs text-white/30 transition hover:text-cyan-400 sm:flex"
              >
                <ArrowLeft size={14} />
                Back to home
              </Link>

              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-cyan-400">
                NEW ACCOUNT
              </p>

              <h2 className="text-4xl font-black tracking-[-0.04em]">
                Create account.
              </h2>

              <p className="mt-3 text-sm text-white/35">
                Create your account and start removing backgrounds.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium text-white/55"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full border border-white/10 bg-white/2.5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-cyan-400/60 focus:bg-white/4"
                />
              </div>

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
                <label
                  htmlFor="password"
                  className="mb-2 block text-xs font-medium text-white/55"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full border border-white/10 bg-white/2.5 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/20 transition focus:border-cyan-400/60 focus:bg-white/4"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-medium text-white/55"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your password again"
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
                className="group mt-2 flex w-full items-center justify-center gap-2 bg-cyan-400 px-4 py-3.5 text-sm font-bold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}

                {!loading && (
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-white/30">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-white transition hover:text-cyan-400"
              >
                Login
              </Link>
            </p>

            <div className="mt-10 border-t border-white/[0.07] pt-5">
              <p className="text-center text-[11px] text-white/20">
                Create an account to get started with BG.REMOVER.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}