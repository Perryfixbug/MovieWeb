'use client'
import { Badge } from '@/components/ui/badge';
import { dict } from '@/lib/dictionnary';
import { toTitleCase } from '@/lib/toCustomCase';
import { cn } from '@/lib/utils';
import { PlayIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const HeroClient = ({carousels}: {carousels: any}) => {
  const [heroMovie, setHeroMovie] = useState<MovieType>(carousels[0].movie);

  return (
    <div className="relative">
      {/* Hero image */}
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          src={heroMovie?.thumbnail}
          alt="Hero"
          className='object-cover object-top'
          fill
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
      <div className="description absolute left-0 top-1/3 flex flex-col px-5 w-1/3 gap-2">
        <Link href={`/watch-movie/${heroMovie?.slug}`} className="bg-background rounded-full w-12 h-12 flex items-center justify-center">
          <PlayIcon size={24} fill="var(--foreground)" />
        </Link>
        <span className="text-5xl font-medium">{heroMovie?.name}</span>
        <ul className="flex flex-wrap gap-2">
          <li><Badge variant={"outline"} className="text-accent border-accent">Imdb {heroMovie?.imdbRate}</Badge></li>
          <li><Badge variant={"outline"}>{heroMovie?.length}ph</Badge></li>
          <li><Badge variant={"outline"}>{heroMovie?.publishYear}</Badge></li>
          <li><Badge >{heroMovie?.status}</Badge></li>
          <li className='flex gap-2'>{heroMovie?.categories?.map((value)=>(
            <Badge key={value}>{toTitleCase(dict[value] ?? value)}</Badge>
          ))}</li>
        </ul>
        <p>{heroMovie?.description}</p>
      </div>

      {/* Carousel */}
      <div className="carousel absolute bottom-20 right-0 flex justify-between px-5 gap-2">
        {carousels.map((carousel: any) => (
          <div
            key={carousel.id}
            className="w-30 aspect-video relative"
            onClick={() => setHeroMovie(carousel.movie)}
          >
            <Image
              src={carousel.movie.thumbnail}
              alt={carousel.movie.name}
              className={cn(
                "rounded-md object-cover",
                heroMovie?.id == carousel.movie.id &&
                  "border-2 border-foreground"
              )}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroClient