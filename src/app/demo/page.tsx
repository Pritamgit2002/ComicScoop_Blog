"use client";
import { useState } from "react";

const content = [
  { title: "one", link: "bfjhbvdjh", genre: "one" },
  { title: "two", link: "bfjhbvdjh", genre: "two" },
  { title: "three", link: "bfjhbvdjh", genre: "three" },
  { title: "four", link: "bfjhbvdjh", genre: "one" },
  { title: "five", link: "bfjhbvdjh", genre: "two" },
  { title: "six", link: "bfjhbvdjh", genre: "three" },
];

const Demo = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Filter content based on the selected genre
  const filteredContent = selectedGenre
    ? content.filter((item) => item.genre === selectedGenre)
    : content;

  return (
    <div className="w-full h-screen bg-red-200/65 text-white  font-semibold flex flex-col items-center justify-center gap-y-10 ">
      <span className="underline uppercase text-6xl ">demo</span>
      <div className="flex items-center justify-center gap-x-28 ">
        <div className="flex flex-col items-center justify-center gap-y-4 text-black font-black text-5xl ">
          {/* Display titles of filtered content */}
          {filteredContent.map((item, i) => (
            <div key={i} className="text-orange-500">
              {item.title}
            </div>
          ))}
          {/* Display titles of rest of the content */}
          {selectedGenre &&
            content
              .filter((item) => item.genre !== selectedGenre)
              .map((item, i) => <div key={i}>{item.title}</div>)}
        </div>
        <div className="flex flex-col items-center justify-center gap-y-8 text-green-400 font-black text-3xl ">
          {/* Genre buttons */}
          <button
            className="bg-slate-600/75 p-3 rounded-xl cursor-pointer active:scale-95"
            onClick={() => setSelectedGenre("one")}
          >
            one
          </button>
          <button
            className="bg-slate-600/75 p-3 rounded-xl cursor-pointer active:scale-95"
            onClick={() => setSelectedGenre("two")}
          >
            two
          </button>
          <button
            className="bg-slate-600/75 p-3 rounded-xl cursor-pointer active:scale-95"
            onClick={() => setSelectedGenre("three")}
          >
            three
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
