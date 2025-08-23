import { Badge } from "@/components/ui/badge"
import { fetchAPI } from "@/lib/api"
import { dict } from "@/lib/dictionnary"
import { toTitleCase } from "@/lib/utils"

const MovieDescribe = async ({params} : {params: Promise<{slug: string}>}) => {
  const {slug} = await params  
  const movie_data = await fetchAPI(`/movie/${slug}`) as MovieType

  return (
    <div className="relative h-[90vh] w-full overflow-hidden grid grid-cols-12 gap-5 px-5">
      <img 
        src={movie_data.thumbnail}
        className="absolute w-full h-full object-cover object-top"
      />
      <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(44, 44, 44, 0.3) 0%, rgba(44, 44, 44, 0.5) 70%, rgba(44, 44, 44, 1) 100%)",
          }}
      />
      {/* Left side */}
      <div className="col-span-4 h-full z-10 mt-20 flex flex-col gap-6">
        <div className="hero grid grid-cols-4 gap-5 w-full justify-between">
          <img src={movie_data.poster} alt={movie_data.name} className="col-span-1 object-contain"/>
          <div className="col-span-3 flex flex-col justify-between">
            <span className="text-lg font-medium">{movie_data.name}</span>
            <ul className="flex flex-wrap gap-2">
              <li><Badge variant={"outline"} className="text-amber-300 border-amber-300">Imdb {movie_data.imdbRate}</Badge></li>
              <li><Badge variant={"outline"}>{movie_data.length}ph</Badge></li>
              <li><Badge variant={"outline"}>{movie_data.publishYear}</Badge></li>
              <li><Badge >{movie_data.status}</Badge></li>
              <li><Badge >{toTitleCase(dict[movie_data.category])}</Badge></li>
            </ul>
          </div>
        </div>

        {/* Descrption */}
        <ul className="description">
          <li>
            <span>Giới thiệu:</span>
            <p className="text-muted-foreground">{movie_data.description}</p>
          </li>
          <li className="flex gap-1">
            <span>Thời lượng:</span>
            <p className="text-muted-foreground">{movie_data.length}ph</p>
          </li>
          <li className="flex gap-1">
            <span>Đạo diễn:</span>
            <p className="text-muted-foreground">{}</p>
          </li>
          <li className="flex gap-1">
            <span>Sản xuất:</span>
            <p className="text-muted-foreground">{}</p>
          </li>
          <li className="flex gap-1">
            <span>Năm phát hành:</span>
            <p className="text-muted-foreground">{}</p>
          </li>
          <li className="flex gap-1">
            <span>Quốc gia:</span>
            <p className="text-muted-foreground">{}</p>
          </li>
          <li className="flex gap-1">
            <span>Nhãn:</span>
            <p className="text-muted-foreground">{}</p>
          </li>
        </ul>
        {/* Đề xuất */}
        <div>
          <span className="text-xl">Đề xuất cho bạn</span>
          <div></div>
        </div>

      </div>

      {/* Right side */}
      <div className="col-span-8 bg-blue-600 h-full z-10 mt-20">

      </div>
    </div>
  )
}

export default MovieDescribe