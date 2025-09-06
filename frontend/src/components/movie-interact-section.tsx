"use client";
import { useAuth } from "@/context/authContext";
import { fetchClient } from "@/lib/api";
import { Bookmark, MessageSquareText, Share, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const MovieInteractSection = ({ movie_data }: { movie_data: MovieType }) => {
  const { userInfo, setUserInfo } = useAuth();

  const [isLike, setIsLike] = useState(false);
  const [inUserList, setInUserList] = useState(false);
  const [copied, setCopied] = useState(false)

  const handleLike = async () => {
    const likes = await fetchClient(`/like/${movie_data.id}`, "POST");
    setUserInfo?.({ ...userInfo, likes: likes });
  };

  const handleList = async () => {
    const list = await fetchClient(`/list/${movie_data.id}`, "POST");
    setUserInfo?.({ ...userInfo, list: list });
  };

  const handleCopy = () => {
    const url = `${window.location.origin}/watch-movie/${movie_data.slug}`;
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false); // ẩn thông báo sau 1s
    }, 1000);
  };

  //Đồng bộ
  useEffect(() => {
    setIsLike(
      userInfo?.likes?.some(
        (like: LikeType) => like.movieId === movie_data.id
      ) ?? false
    );
  }, [userInfo?.likes, movie_data.id]);

  useEffect(() => {
    setInUserList(
      userInfo?.list?.some((movie: MovieType) => movie.id === movie_data.id) ??
        false
    );
  }, [userInfo?.list, movie_data.id]);


  return (
    <ul className="flex justify-between relative">
      <li onClick={handleLike} className="cursor-pointer">
        <ThumbsUp
          className="icon"
          style={{
            stroke: `${isLike ? "var(--accent)" : "var(--foreground)"}`,
            fill: `${isLike ? "var(--accent)" : "none"}`,
          }}
        />
      </li>
      <li
        className="cursor-pointer"
        onClick={() => {
          const el = document.getElementById("write-comment-input") as HTMLInputElement;
          el?.focus();
        }}
      >
        <MessageSquareText className="icon" />
      </li>
      <li onClick={handleList} className="cursor-pointer">
        <Bookmark
          className="icon"
          style={{
            stroke: `${inUserList ? "var(--accent)" : "var(--foreground)"}`,
            fill: `${inUserList ? "var(--accent)" : "none"}`,
          }}
        />
      </li>
      <li className="cursor-pointer" onClick={handleCopy}>
        <Share className="icon" />
      </li>
      {/* Dòng chữ bay lên */}
      {copied && (
        <span className="absolute -top-6 -right-6 transform animate-fly-up text-sm text-muted px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </ul>
  );
};

export default MovieInteractSection;
