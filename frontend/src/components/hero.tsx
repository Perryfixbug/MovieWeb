"use client";
import { fetchAPI } from "@/lib/api";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const [carousels, setCarousels] = useState<[]>([]);
  const [heroMovie, setHeroMovie] = useState<MovieType>();
  useEffect(() => {
    async function fetchCarousels() {
      const data = await fetchAPI("/carousel");
      console.log(data);
      setCarousels(data);
      setHeroMovie(data[0].movie);
    }
    fetchCarousels();
  }, []);

  return (
    <div className="relative">
      {/* Hero image */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={heroMovie?.thumbnail}
          alt="Hero"
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(44, 44, 44, 0.3) 0%, rgba(44, 44, 44, 0.5) 70%, rgba(44, 44, 44, 1) 100%)",
          }}
        />
      </div>

      {/* Description */}
      <div className="description"></div>

      {/* Carousel */}
      <div className="carousel absolute bottom-20 right-0 flex justify-between px-5 mt-5 gap-2">
        {carousels.map((carousel: any) => (
          <div
            key={carousel.id}
            className={cn("w-24 aspect-[4/3]")}
            onClick={() => setHeroMovie(carousel.movie)}
          >
            <img
              src={carousel.movie.thumbnail}
              className={cn(
                "rounded-md object-cover",
                heroMovie?.id == carousel.movie.id &&
                  "border-2 border-foreground"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
