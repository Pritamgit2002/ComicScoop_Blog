import { client, urlFor } from "@/app/lib/sanity";
import { simpleBlogCard } from "@/app/lib/types";
import React from "react";
import { LayoutGrid } from "./layout-grid";
async function getData() {
  const query = `*[_type== 'blog'] | order(_createdAt desc){
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
      <LayoutGrid cards={data} />
    </div>
  );
}
