import CategorySection from "@/components/category-section";
import Hero from "@/components/hero";
import MoviesByCategory from "@/components/movies-by-category";
import Movie from "@/components/movie";
import { fetchAPI } from "@/lib/api";

export default async function Home() {
  const list = await fetchAPI("/movie");

  return (
      <main className="flex flex-col w-full h-full gap-2">
        <Hero />
        <CategorySection />
        <div className="px-5">
          {Object.entries(list).map(([category, movies]) => (
              <MoviesByCategory
                key={category}
                category={category}
                movies={movies as MovieType[]}
              />
          ))}
        </div>
      </main>
  );
}
