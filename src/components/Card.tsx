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
];

// async function getData() {
//   const [genre, setGenre] = useState<string>("all");
//   const query = `*[_type== 'blog' && genre == ${genre} ] | order(_createdAt desc){
//       id,
//       title,
//       smallDescription,
//       "currentSlug":slug.current,
//       titleImage,
//     }`;
//   const data = await client.fetch(query);
//   console.log(data);
//   return data;
// }

export default function Card() {
  const [search, setSearch] = useState<string>("all");

  const [data, setData] = useState<simpleBlogCard[]>([]);
  useEffect(() => {
    async function getData() {
      let query = `*[_type == 'blog'`;

      // If search is not 'all', add genre filter to the query
      if (search !== "all") {
        query += ` && genre == "${search}"`;
      }

      query += `] | order(_createdAt desc) {
        id,
        title,
        smallDescription,
        "currentSlug": slug.current,
        titleImage,
      }`;

      try {
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, [search]);
  // const data: simpleBlogCard[] = await getData();
  // console.log(data);
  return (
    <div className="min-h-screen h-max w-full overflow-y-auto bg-black   ">
      <div className="w-full flex items-center justify-center gap-4 ">
        {content.map((item, i) => (
          <div
            className="text-2xl font-bold text-white cursor-pointer active:opacity-80 "
            onClick={() => {
              setSearch(item.genre);
            }}
          >
            {item.genre}
          </div>
        ))}
      </div>
      <LayoutGrid cards={data} />
    </div>
  );
}
