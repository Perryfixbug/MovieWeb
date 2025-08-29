import Movie from '@/components/movie'
import { fetchAPI } from '@/lib/api'
import { categoryColor, dict } from '@/lib/dictionnary'
import { toTitleCase } from '@/lib/toCustomCase'
import React from 'react'

export async function generateStaticParams() {
  const countries = await fetchAPI('/movie/country')
  return countries.map((country: string)=>({
    slug: country
  }))
}

const Type = async ({params}:{params: Promise<{slug: string}>}) => {
  const {slug} = await params
  const color = categoryColor[slug] ?? "red"
  
  const movies = await fetchAPI(`/movie/all?country=${slug}`)

  return (
    <div className='flex flex-col gap-10 pt-20 px-5 w-full h-screen' style={{background: `linear-gradient(to bottom, ${color} 0%, rgba(44, 44, 44, 1) 30%)`}}>
      <span className='font-bold text-5xl' >{toTitleCase(dict[slug] ?? slug)}</span>
      <div className='flex gap-5'>{movies.map((movie: MovieType)=>(
        <Movie key={movie.id} movie_data={movie} />
      ))}</div>
    </div>
  )
}

export default Type