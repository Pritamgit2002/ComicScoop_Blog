"use client";
import localFont from "next/font/local";
import Card from "@/components/Card";
import "./globals.css";
import Navbar from "@/components/Navbar";
const heading = localFont({ src: "../../public/fonts/Thin Fox.ttf" });
export default function Home() {
  return (
    <div className=" w-full min-h-screen h-max bg-black overflow-y-auto ">
      <Navbar />
      <div
        className="  text-8xl font-semibold text-white leading-loose shimmer_title w-full flex items-center justify-center text-center static  "
        style={heading.style}
      >
        SmileScoop
      </div>
      <div
        className="text-3xl  text-center text-white mx-auto max-w-7xl  py-10 "
        style={heading.style}
      >
        Recent topics with{" "}
        <span className="text-[#393939] text-4xl font-semibold leading-tight shimmer_subtitle ">
          comic twist.
        </span>
      </div>

      <Card />
    </div>
  );
}
