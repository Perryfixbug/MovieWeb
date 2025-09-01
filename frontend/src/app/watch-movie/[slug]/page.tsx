import WriteCommentSection from "@/components/write-comment-section";
import { Badge } from "@/components/ui/badge";
import UserComment from "@/components/user-comment";
import { fetchServer } from "@/lib/api";
import { dict } from "@/lib/dictionnary";
import { toTitleCase } from "@/lib/toCustomCase";
import {
  BookMarkedIcon,
  ChevronLeftIcon,
  MessageSquareTextIcon,
  ShareIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Link from "next/link";
import ReactPlayer from "react-player";
import BackButton from "@/components/back-button";

const WatchMovie = async ({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>,
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const { slug } = await params;
  const { record } = searchParams;
  const movie_data = (await fetchServer(`/movie/${slug}`)) as MovieType;
  const link = movie_data.videos.find((video: VideoType)=>video.name == record)?.link

  return (
    <div className="page pt-16 px-5 flex flex-col w-full h-full gap-10">
      <BackButton>Quay lại</BackButton>
      <div className="watch-section bg-black rounded-lg overflow-hidden w-8/12 mx-auto">
        <ReactPlayer
          src={link || movie_data.trailer}
          controls
          className="aspect-video rounded-sm object-contain"
          width={"100%"}
          height={"100%"}
          playIcon
          volume={0.5}
        />
      </div>

      <div className="other grid grid-cols-12 gap-5">
        {/* Left side */}
        <div className="left col-span-8 grid grid-cols-8 gap-5 w-full justify-between">
          <img
            src={movie_data.poster}
            alt={movie_data.name}
            className="col-span-1 object-contain"
          />
          <div className="col-span-3 flex flex-col justify-between">
            <span className="text-lg font-medium">{movie_data.name}</span>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Badge
                  variant={"outline"}
                  className="text-accent border-accent"
                >
                  Imdb {movie_data.imdbRate}
                </Badge>
              </li>
              <li>
                <Badge variant={"outline"}>{movie_data.length}ph</Badge>
              </li>
              <li>
                <Badge variant={"outline"}>{movie_data.publishYear}</Badge>
              </li>
              <li>
                <Badge>{movie_data.status}</Badge>
              </li>
              <li className="flex gap-2">
                {movie_data?.categories?.map((value) => (
                  <Badge key={value}>{toTitleCase(dict[value] ?? value)}</Badge>
                ))}
              </li>
            </ul>
          </div>
          <p className="col-span-8">{movie_data.description}</p>
          <div className="col-span-8 flex flex-col gap-2">
            <WriteCommentSection movieId={movie_data.id} />
            <UserComment movieId={movie_data.id} />
          </div>
        </div>
        {/* Righ side */}
        <div className="right col-span-4 grid grid-cols-4 gap-5 grid-rows-[20px_100px_1fr]">
          <ul className="flex justify-start h-5 gap-5 items-center col-start-1 col-span-2">
            <li><ThumbsUpIcon className="icon" /></li>
            <li><MessageSquareTextIcon className="icon" /></li>
            <li><BookMarkedIcon className="icon" /></li>
            <li><ShareIcon className="icon" /></li>
          </ul>
          <div className="col-span-4">
            <p className="flex gap-1 text-muted">
              {" "}
              <span className="text-muted-foreground">Đạo diễn:</span>
              {movie_data.director}
            </p>
            <p className="flex gap-1 text-muted">
              {" "}
              <span className="text-muted-foreground">Diễn viên:</span>
              {movie_data.actor}
            </p>
          </div>
          <div className="col-span-4">
            <span className="text-xl">Đề xuất cho bạn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
