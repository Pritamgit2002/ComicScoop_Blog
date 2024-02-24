"use client";
import { client, urlFor } from "@/app/lib/sanity";
import { simpleBlogCard } from "@/app/lib/types";
import React, { useEffect, useState } from "react";
import { LayoutGrid } from "./layout-grid";
const content = [
  { genre: "all", link: "all" },
  { genre: "travel", link: "travel" },
  { genre: "sports", link: "sports" },
  { genre: "science", link: "science" },
  { genre: "tech", link: "tech" },
];
export default function Card() {
  const [search, setSearch] = useState<string>("all");
  const [data, setData] = useState<simpleBlogCard[]>([]);
  useEffect(() => {
    async function getData() {
      const query = `*[_type== 'blog'] | order(_createdAt desc){
        id,
        title,
        genre,
        smallDescription,
        "currentSlug":slug.current,
        titleImage,
      }`;
      const fetchedData = await client.fetch(query);
      setData(fetchedData); // Set the fetched data
    }

    getData(); // Call the function to fetch data
  }, []);

  return (
    <div className="min-h-screen h-max w-full overflow-y-auto bg-black   ">
      <div className="w-full flex items-center justify-center gap-4 ">
        {content.map((item, i) => (
          <div
            className={`text-2xl font-bold text-white cursor-pointer ${
              search == item.genre ? "opacity-50" : ""
            }  `}
            onClick={() => {
              setSearch(item.genre);
            }}
          >
            {item.genre}
          </div>
        ))}
      </div>
      <LayoutGrid cards={data} search={search} />
    </div>
  );
}
