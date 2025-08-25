import CommentSection from '@/components/comment-section'
import { Badge } from '@/components/ui/badge'
import { fetchAPI } from '@/lib/api'
import { dict } from '@/lib/dictionnary'
import { toTitleCase } from '@/lib/toCustomCase'
import { BookMarkedIcon, ChevronLeft, ChevronLeftIcon, MessageSquareTextIcon, ShareIcon, ThumbsUpIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const WatchMovie = async ({params}: {params: Promise<{slug: string}>}) => {
  const {slug} = await params
  const movie_data = await fetchAPI(`/movie/${slug}`) as MovieType

  return (
    <div className='page pt-16 px-5 flex flex-col w-full h-full gap-5'>
      <Link href={`/movie/${slug}`} className='step-back flex gap-2 items-center'>
        <ChevronLeftIcon size={16} />
        {movie_data.name}
      </Link>
      <div className='watch-section w-8/12 m-auto aspect-video bg-amber-300'>
        <video src={movie_data.link_video}/>
      </div>
      <div className='other grid grid-cols-12 gap-5'>
        {/* Left side */}
        <div className="left col-span-8 grid grid-cols-8 gap-5 w-full justify-between">
          <img src={movie_data.poster} alt={movie_data.name} className="col-span-1 object-contain"/>
          <div className="col-span-3 flex flex-col justify-between">
            <span className="text-lg font-medium">{movie_data.name}</span>
            <ul className="flex flex-wrap gap-2">
              <li><Badge variant={"outline"} className="text-accent border-accent">Imdb {movie_data.imdbRate}</Badge></li>
              <li><Badge variant={"outline"}>{movie_data.length}ph</Badge></li>
              <li><Badge variant={"outline"}>{movie_data.publishYear}</Badge></li>
              <li><Badge >{movie_data.status}</Badge></li>
              <li><Badge >{toTitleCase(dict[movie_data.category])}</Badge></li>
            </ul>
          </div>
          <p className='col-span-8'>{movie_data.description}</p>
          <div className='col-span-8'>
            <CommentSection />
          </div>
        </div>
        {/* Righ side */}
        <div className='right col-span-4 grid grid-cols-4 gap-5 grid-rows-[20px]'>
          <ul className="flex justify-around col-start-3 col-span-2">
            <li><ThumbsUpIcon className="icon" /></li>
            <li><MessageSquareTextIcon className="icon" /></li>
            <li><BookMarkedIcon className="icon" /></li>
            <li><ShareIcon className="icon" /></li>
          </ul>
          <div className='col-span-4'>
            <p><span>Đạo diễn: </span>{}</p>
            <p><span>Diễn viên: </span>{}</p>
          </div>
          <div className='col-span-4'>
            <span className='text-xl'>Đề xuất cho bạn</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WatchMovie