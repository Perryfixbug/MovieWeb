import Movie from '@/components/movie'
import { fetchServer } from '@/lib/api'
import { categoryColor, dict } from '@/lib/dictionnary'
import { toTitleCase } from '@/lib/toCustomCase'
import React from 'react'

export async function generateStaticParams() {
  const categories = await fetchServer('/category')
  return categories.map((category: CategoryType)=>({
    slug: category.value
  }))
}

const Category = async ({params}:{params: Promise<{slug: string}>}) => {
  const {slug} = await params
  const color = categoryColor[slug] ?? "red"
  
  const movies = await fetchServer(`/movie/all?category=${slug}`) as MovieType[]

  return (
    <div className='flex flex-col gap-10 pt-20 px-5 w-full h-screen' style={{background: `linear-gradient(to bottom, ${color} 0%, rgba(44, 44, 44, 1) 30%)`}}>
      <span className='font-bold text-5xl' >{toTitleCase(dict[slug] ?? slug)}</span>
      <div className='flex gap-5 flex-wrap'>{movies.map((movie: MovieType)=>(
        <Movie key={movie.id} movie_data={movie} />
      ))}</div>
    </div>
  )
}

export default Category