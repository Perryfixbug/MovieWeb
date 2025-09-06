import Image from "next/image"
import Link from "next/link"

const Movie = ({movie_data}:{ movie_data: MovieType}) => {
  return (
    <Link className="w-20 sm:w-32" href={`/movie/${movie_data.slug}`}>
      <div className="w-20 sm:w-32 sm:h-48 relative rounded-sm overflow-clip">
        <Image 
          src={movie_data.poster}
          alt={movie_data.name}
          className="object-cover" 
          fill
          sizes="128px"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-center h-12 line-clamp-2">{movie_data.name}</span>
        <span className="text-muted">{movie_data.publishYear}</span>
      </div>
    </Link>  
    
  )
}

export default Movie