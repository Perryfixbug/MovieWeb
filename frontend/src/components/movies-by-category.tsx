import Movie from "@/components/movie";
import { fetchAPI } from "@/lib/api";
import { dict } from "@/lib/dictionnary";
import { toTitleCase } from "@/lib/toCustomCase";
import React from "react";

const MoviesByCategory = async ({
  category,
  movies,
}: {
  category: string;
  movies: MovieType[];
}) => {
  if (movies.length == 0) return
  return (
    <div>
      <span className="text-lg">{toTitleCase(dict[category])}</span>
      <div className="flex gap-2 overflow-auto">
        {movies.map((movie: MovieType) => (
          <Movie key={movie.id} movie_data={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesByCategory;
