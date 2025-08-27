import CategorySection from "@/components/category-section";
import Hero from "@/components/hero";
import MoviesByCategory from "@/components/movies-by-category";
import Movie from "@/components/movie";
import { fetchAPI } from "@/lib/api";

export default async function Home() {
  const list = await fetchAPI("/category/movie") as CategoryType[];

  return (
      <main className="flex flex-col w-full h-full gap-2">
        <Hero />
        <CategorySection />
        <div className="px-5">
          {list.map((category) => (
              <MoviesByCategory
                key={category.id}
                category={category.value}
                movies={category.movies as MovieType[]}
              />
          ))}
        </div>
      </main>
  );
}
