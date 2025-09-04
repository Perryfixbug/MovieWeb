import WriteCommentSection from "@/components/write-comment-section";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import UserComment from "@/components/user-comment";
import Record from "@/components/record-section";
import { fetchServer } from "@/lib/api";
import { dict } from "@/lib/dictionnary";
import { toTitleCase } from "@/lib/toCustomCase";
import {
  BookMarkedIcon,
  MessageSquareTextIcon,
  PlayIcon,
  ShareIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/back-button";

const MovieDescribe = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const movie_data = (await fetchServer(`/movie/${slug}`)) as MovieType;

  return (
    <div className="relative h-full w-full  overflow-clip">
      <Image
        src={movie_data.thumbnail}
        alt={movie_data.name}
        className="absolute w-full h-screen object-cover object-top z-0"
        width={500}
        height={300}
      />
      <div
        className="absolute inset-0 h-screen z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(44, 44, 44, 0.5) 0%,rgba(44, 44, 44, 0.6) 70%, rgba(44, 44, 44, 1) 100%)",
        }}
      />
      {/* main */}
      <div className="px-5 pt-16">
        <BackButton className="z-20 mb-5">Quay lại</BackButton>
        <div className="grid grid-cols-12 gap-5 ">
          {/* Left side */}
          <div className="col-span-4 h-full z-10 flex flex-col gap-6">
            <div className="hero grid grid-cols-4 gap-5 w-full justify-between">
              <div className="relative col-span-1">
                <Image
                  src={movie_data.poster}
                  alt={movie_data.name}
                  width={300}
                  height={500}
                  className="object-contain object-top-left"
                />
              </div>
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
                  <li>
                    {movie_data?.categories?.map((value) => (
                      <Badge key={value}>
                        {toTitleCase(dict[value] ?? value)}
                      </Badge>
                    ))}
                  </li>
                </ul>
              </div>
            </div>

            {/* Descrption */}
            <ul className="description">
              <li>
                <span>Giới thiệu:</span>
                <p className="text-muted">{movie_data.description}</p>
              </li>
              <li className="flex gap-1">
                <span>Thời lượng:</span>
                <p className="text-muted">{movie_data.length}ph</p>
              </li>
              <li className="flex gap-1">
                <span>Đạo diễn:</span>
                <p className="text-muted">{movie_data.director}</p>
              </li>
              <li className="flex gap-1">
                <span>Sản xuất:</span>
                <p className="text-muted">{movie_data.production}</p>
              </li>
              <li className="flex gap-1">
                <span>Năm phát hành:</span>
                <p className="text-muted">{movie_data.publishYear}</p>
              </li>
              <li className="flex gap-1">
                <span>Quốc gia:</span>
                <p className="text-muted">{movie_data.country}</p>
              </li>
              <li className="flex gap-1">
                <span>Nhãn:</span>
                <p className="text-muted">{movie_data.label}</p>
              </li>
            </ul>
            {/* Đề xuất */}
            <div>
              <span className="text-xl">Đề xuất cho bạn</span>
              <div></div>
            </div>
          </div>

          {/* Right side */}
          <div className="col-span-8 h-full z-10 flex flex-col gap-2">
            {/* Button */}
            <div className="function-button-section grid grid-cols-8 items-center">
              <Link
                href={`/watch-movie/${movie_data.slug}`}
                className="flex items-center justify-center gap-2 bg-accent rounded-full col-start-1 w-40 h-10"
              >
                <PlayIcon fill="var(--foreground)" size={16} />
                <span className="font-medium text-lg">Xem ngay</span>
              </Link>
              <ul className="flex justify-around col-start-3 col-span-2">
                <li>
                  <ThumbsUpIcon className="icon" />
                </li>
                <li>
                  <MessageSquareTextIcon className="icon" />
                </li>
                <li>
                  <BookMarkedIcon className="icon" />
                </li>
                <li>
                  <ShareIcon className="icon" />
                </li>
              </ul>
              <div className="fact col-start-6 col-span-3 text-muted">
                <span className="font-bold text-foreground">Fact: </span>
                {movie_data.fact}
              </div>
            </div>

            {/* Movie episode */}
            <div className="">
              <Tabs defaultValue="episode">
                <TabsList className="bg-transparent">
                  <TabsTrigger value="episode">Tập phim</TabsTrigger>
                  <TabsTrigger value="actor">Diễn viên</TabsTrigger>
                  <TabsTrigger value="suggest">Đề xuất</TabsTrigger>
                </TabsList>
                <TabsContent value="episode">
                  <Record movie_data={movie_data} />
                </TabsContent>
                <TabsContent value="actor">Diễn viên</TabsContent>
                <TabsContent value="suggest">Quạc gợi ý</TabsContent>
              </Tabs>
            </div>

            {/* Comment section */}
            <div className="w-[80%] flex flex-col gap-2">
              <WriteCommentSection movieId={movie_data.id} />
              <UserComment movieId={movie_data.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescribe;
