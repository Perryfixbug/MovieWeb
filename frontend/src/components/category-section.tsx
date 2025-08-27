import { fetchAPI } from "@/lib/api";
import { dict } from "@/lib/dictionnary";
import { toTitleCase } from "@/lib/toCustomCase";
import Link from "next/link";
import React from "react";

const CategorySection = async () => {
  const data = await fetchAPI("/category");
  const categories = data.map((category: CategoryType) => category.value);
  return (
    <div className="px-5">
      <h1 className="title text-lg">Bạn đang quan tâm thể loại nào</h1>
      <div className="flex overflow-x-auto gap-2 py-2">
        {categories.slice(0,5).map((name: string) => (
          <Link
            href={`/category/${name}`}
            key={name}
            className="min-w-64 h-32 flex items-center justify-center bg-background border-muted border-[1px] rounded-sm"
          >
            {toTitleCase(dict[name] ?? name)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
