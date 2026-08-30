"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  ImagePlus,
  LayersArrowDown,
  Loader2,
  Palette,
  RotateCcw,
  Upload,
} from "lucide-react";
import Image from "next/image";

export default function RemoveBackgroundPage() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [backgroundColor, setBackgroundColor] = useState<string | null>(null);

  // Cleaning the input image URLs and result image URLs when the component unmounts or when a new file is selected.
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [originalUrl, resultUrl]);

  //Recives the selected file and checks if it is an image.
  function handleFile(selectedFile: File) {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setError("");
    setFile(selectedFile);
    setResultUrl("");

    //If there is an existing originalUrl, revoke it to free up memory before creating a new one.
    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
    }

    setOriginalUrl(URL.createObjectURL(selectedFile));
  }

  // Handles the file input change event, retrieves the selected file, and passes it to the handleFile function for processing.
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  }

  async function removeBackground() {
    if (!file) return;

    setLoading(true);
    setError("");
    setResultUrl("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/remove-background`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove background.");
      }

      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  //Downloads the image with the selected background color applied, if any.
  async function downloadImage() {
    if (!resultUrl) return;

    try {
      const image = new window.Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        // If a background color is selected,
        // draw that color first.
        if (backgroundColor) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw the transparent background-removed image
        ctx.drawImage(image, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) return;

          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = "bg-removed.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          URL.revokeObjectURL(url);
        }, "image/png");
      };

      image.src = resultUrl;
    } catch (error) {
      console.error("Download failed:", error);
    }
  }

  function reset() {
    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
    }

    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
    }

    setFile(null);
    setOriginalUrl("");
    setResultUrl("");
    setError("");
    setLoading(false);
  }

  return (
    <main className="min-h-screen px-4 pb-20 pt-32 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Background Removal
          </p>

          <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-6xl">
            Remove the <span className="text-white/35">background.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/40">
            Upload your image and get a clean transparent background in seconds.
          </p>
        </motion.div>

        {/* Upload */}
        {!file && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`mx-auto max-w-3xl border p-8 transition sm:p-14 ${
              dragging ? "border-cyan-400 bg-cyan-400/3" : "border-white/10"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center border border-white/10 text-cyan-400">
                <ImagePlus size={28} strokeWidth={1.5} />
              </div>

              <h2 className="text-lg font-semibold text-white">
                Drop your image here
              </h2>

              <p className="mt-2 text-sm text-white/30">PNG, JPG or WEBP</p>

              <label className="group mt-7 flex cursor-pointer items-center gap-2 bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 active:scale-95">
                <Upload
                  size={16}
                  className="group-hover:transition-transform group-hover:-translate-y-1"
                />
                Choose image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </label>
            </div>
          </motion.div>
        )}

        {/* Preview */}
        {file && !resultUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl"
          >
            <div className="grid overflow-hidden border border-white/10 md:grid-cols-2">
              {/* Original */}
              <div className="border-b border-white/10 md:border-b-0 md:border-r">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <p className="text-xs font-medium text-white/50">Original</p>

                  <p className="max-w-45 truncate text-xs text-white/20">
                    {file.name}
                  </p>
                </div>

                <div className="flex min-h-87.5 items-center justify-center bg-black/10 p-6">
                  <Image
                    src={originalUrl}
                    alt="Original image"
                    height={400}
                    width={400}
                    className="max-h-100 max-w-full object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="border-b border-white/10 px-5 py-4">
                  <p className="text-xs font-medium text-white/50">Result</p>
                </div>

                <div className="flex min-h-87.5 items-center justify-center p-6">
                  {loading ? (
                    <div className="flex flex-col items-center text-center">
                      <Loader2
                        size={30}
                        className="animate-spin text-cyan-400"
                      />

                      <p className="mt-5 text-sm text-white/60">
                        Removing background...
                      </p>

                      <p className="mt-1 text-xs text-white/25">
                        This may take a few seconds
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-white/30">Ready to remove</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!loading && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={removeBackground}
                  className="group flex items-center justify-center gap-2 bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 active:scale-95"
                >
                  <LayersArrowDown
                    size={18}
                    className="group-hover:transition-transform group-hover:translate-y-1 duration-300"
                  />
                  Remove Background
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="group flex items-center justify-center gap-2 border border-white/10 px-6 py-3 text-sm font-medium text-white/50 transition hover:border-white/20 hover:text-white active:scale-95"
                >
                  <RotateCcw
                    className="transition-transform duration-300 group-hover:-rotate-90"
                    size={16}
                  />
                  Choose another
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Result */}
        {resultUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl"
          >
            <div className="border border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <p className="text-xs font-medium text-white/50">
                  Background removed
                </p>

                <span className="text-xs text-cyan-400">Ready</span>
              </div>

              {/* Add Custom bg-colors */}
              <div
                className={`flex min-h-100 items-center justify-center p-8 ${
                  backgroundColor === null
                    ? "bg-[linear-gradient(45deg,#1a1a1a_25%,transparent_25%),linear-gradient(-45deg,#1a1a1a_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1a1a1a_75%),linear-gradient(-45deg,transparent_75%,#1a1a1a_75%)] bg-size-[24px_24px] bg-position-[0_0,0_12px,12px_-12px,-12px_0]"
                    : ""
                }`}
                style={{
                  backgroundColor: backgroundColor ?? "#0d0d0d",
                }}
              >
                <Image
                  src={resultUrl}
                  alt="Background removed result"
                  height={400}
                  width={400}
                  className="max-h-125 max-w-full object-contain"
                />
              </div>
            </div>

            {/* Background Color */}
            <div className="mt-6 border border-white/10 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Palette size={16} className="text-cyan-400" />

                    <p className="text-sm font-medium text-white">
                      Background Color
                    </p>
                  </div>

                  <p className="mt-1 text-xs text-white/30">
                    Choose a color for your photo background.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={backgroundColor ?? "#FFFFFF"}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="h-10 w-12 cursor-pointer border border-white/10 bg-transparent p-1"
                    aria-label="Choose background color"
                  />

                  <input
                    type="text"
                    value={backgroundColor ?? "#FFFFFF"}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-28 border border-white/10 bg-white/5 px-3 py-2 text-sm uppercase text-white outline-none transition focus:border-cyan-400"
                    maxLength={7}
                    aria-label="Background color hex value"
                  />
                </div>
              </div>

              {/* Preset Colors */}
              <div className="mt-5 flex flex-wrap gap-2">
                {/* Transparent */}
                <button
                  type="button"
                  onClick={() => setBackgroundColor(null)}
                  className={`h-8 w-8 border transition ${
                    backgroundColor === null
                      ? "border-cyan-400"
                      : "border-white/10"
                  }`}
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)",
                    backgroundSize: "12px 12px",
                    backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0",
                  }}
                  aria-label="Transparent background"
                  title="Transparent"
                />

                {/* Colors */}
                {["#FFFFFF", "#000000", "#FF0000", "#0091FF", "#18D818"].map(
                  (color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setBackgroundColor(color)}
                      className={`h-8 w-8 border transition ${
                        backgroundColor?.toUpperCase() === color
                          ? "border-cyan-400"
                          : "border-white/10"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Set background color to ${color}`}
                      title={color}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={downloadImage}
                className="group flex items-center justify-center gap-2 bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 active:scale-95"
              >
                <ArrowDownToLine
                  size={16}
                  className="group-hover:transition-transform group-hover:translate-y-1 duration-300"
                />
                Download Image
              </button>

              <button
                type="button"
                onClick={reset}
                className="group flex items-center justify-center gap-2 border border-white/10 px-6 py-3 text-sm font-medium text-white/50 transition hover:border-white/20 hover:text-white active:scale-95"
              >
                <RotateCcw
                  size={15}
                  className="group-hover:transition-transform group-hover:-rotate-90 duration-300"
                />
                Remove another
              </button>
            </div>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-6 text-center text-sm text-red-400">{error}</p>
        )}
      </div>
    </main>
  );
}
