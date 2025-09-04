import { fetchServer } from "@/lib/api";
import { categoryColor, dict } from "@/lib/dictionnary";
import { toTitleCase } from "@/lib/toCustomCase";
import Image from "next/image";
import Link from "next/link";

const Category = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const color = categoryColor[slug] ?? "red";

  const categories = (await fetchServer(`/category`)) as CategoryType[];

  return (
    <div
      className="flex flex-col gap-10 pt-20 px-5 w-full h-screen"
      style={{
        background: `linear-gradient(to bottom, ${color} 0%, rgba(44, 44, 44, 1) 30%)`,
      }}
    >
      <span className="font-bold text-5xl">
        {toTitleCase(dict[slug] ?? slug)}
      </span>
      <div className="grid grid-cols-6 gap-5">
        {categories.map((category: CategoryType) => (
          <Link
            href={`/category/${category.value}`}
            key={category.value}
            className="min-w-54 aspect-video relative flex items-center justify-center rounded-lg overflow-clip"
          >
            <Image
              src={category.thumbnail}
              alt="#"
              className="w-full h-full object-cover object-center absolute"
              fill
            />
            <div className="absolute inset-0 bg-background/50" />
            <span className="z-10 font-medium title">
              {toTitleCase(dict[category.value] ?? category.value)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
