import { client, urlFor } from "@/app/lib/sanity";
import { fullBlog } from "@/app/lib/types";
import NavbarBlog from "@/components/NavbarBlog";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
      }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div>
      <NavbarBlog />
      <div className=" w-full mx-auto flex flex-col items-center justify-center pt-28 max-w-7xl ">
        {/* <NextBreadcrumb
          homeElement={"Home"}
          separator={<span> / </span>}
          activeClasses="text-amber-500"
          containerClasses="flex py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white "
          listClasses="hover:underline mx-2 text-2xl text-white font-bold"
          capitalizeLinks
        /> */}

        <div className="mt-2 block text-3xl text-center leading-8 font-black tracking-tight sm:text-7xl text-white pb-20 ">
          {data?.title}
        </div>

        <Image
          src={urlFor(data?.titleImage).url()}
          width={2000}
          height={2000}
          alt="Title Image"
          priority
          className=" w-4/5 h-[500px] object-cover opacity-80 "
        />
        <div className="mt-16 prose prose-red prose-invert prose-li:marker:text-primary prose-a:text-primary">
          <PortableText value={data?.content} />
        </div>
      </div>
    </div>
  );
}
