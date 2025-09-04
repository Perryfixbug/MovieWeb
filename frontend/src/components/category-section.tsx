import { fetchServer } from "@/lib/api";
import { dict } from "@/lib/dictionnary";
import { toTitleCase } from "@/lib/toCustomCase";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategorySection = async () => {
  const data = await fetchServer("/category");
  const categories = data.map((category: CategoryType) => category);
  return (
    <div className="px-5">
      <h1 className="title text-lg">Bạn đang quan tâm thể loại nào</h1>
      <div className="grid grid-cols-6 justify-between gap-2 py-2">
        {categories.slice(0,5).map((category: CategoryType) => {
        return(
          <Link
            href={`/category/${category.value}`}
            key={category.value}
            className="min-w-54 aspect-video relative flex items-center justify-center rounded-lg overflow-clip"
          >
            <Image 
              src={category.thumbnail}
              alt="#"
              className="object-cover object-center"
              fill
              sizes="216px"
            />
            <div
              className="absolute inset-0 bg-background/50"
            />
            <span className="z-10 font-medium title">{toTitleCase(dict[category.value] ?? category.value)}</span>
          </Link>
        )})}
        <Link
          href={`/category`}
          className="min-w-54 aspect-video relative flex items-center justify-center rounded-lg overflow-clip"
        >
          <Image 
            alt="#"
            src={"https://th.bing.com/th/id/OIP.gBWGbwB7b8_fTnXAGPxUHgHaE8?w=250&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"}
            className="w-full h-full object-cover object-center absolute"
            fill
          />
          <div
            className="absolute inset-0 bg-background/50"
          />
          <span className="z-10 font-medium title">{toTitleCase("10+ thể loại")}</span>
        </Link>
      </div>
    </div>
  );
};

export default CategorySection;
