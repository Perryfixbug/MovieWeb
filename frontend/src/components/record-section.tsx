import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecordSection = ({ movie_data }: { movie_data: MovieType }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-lg font-medium">Các bản chiếu</span>
      <div className="w-full flex gap-5">
        {movie_data.videos.length != 0 ? (
          movie_data?.videos?.map((video: VideoType) => (
            <Link
              key={video.id}
              href={`/watch-movie/${movie_data.slug}?record=${video.slug}`}
              className="relative flex justify-center items-center aspect-video w-30 rounded-md overflow-clip border"
            >
              <Image
                src="/images/mov list.webp"
                alt="#"
                fill
                className="z-0 object-cover"
              />
              <div className="absolute top-0 bg-background/60 z-10 w-full h-full" />
              <span className="z-20 text-lg font-medium">{video.name}</span>
            </Link>
          ))
        ) : (
          <p className="text-muted/70">
            Đợi nhé, bản chiếu mới nhất sắp được cập nhật rồi
          </p>
        )}
      </div>
    </div>
  );
};

export default RecordSection;
