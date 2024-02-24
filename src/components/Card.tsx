import { client, urlFor } from "@/app/lib/sanity";
import { simpleBlogCard } from "@/app/lib/types";
import React from "react";
import { LayoutGrid } from "./layout-grid";
const content = [
  { title: "all", link: "all" },
  { title: "travel", link: "travel" },
  { title: "sports", link: "sports" },
  { title: "science", link: "science" },
];
async function getData() {
  const query = `*[_type== 'blog' ] | order(_createdAt desc){
      id,
      title,
      smallDescription,
      "currentSlug":slug.current,
      titleImage,
    }`;
  const data = await client.fetch(query);
  console.log(data);
  return data;
}
export default async function Card() {
  const data: simpleBlogCard[] = await getData();
  console.log(data);
  return (
    <div className="min-h-screen h-max w-full overflow-y-auto bg-black   ">
      <div className="w-full flex items-center justify-center gap-4 ">
        {content.map((item, i) => (
          <div>{item.title}</div>
        ))}
      </div>
      <LayoutGrid cards={data} />
    </div>
  );
}
