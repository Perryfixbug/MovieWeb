"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/authContext";
import { fetchClient, fetchServer } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  MessageSquareTextIcon,
  SendIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

interface CommentForm {
  content: string;
  targetType: string;
  targetId: number;
  spoil: boolean;
}

const WriteCommentSection = ({ movieId }: { movieId: number }) => {
  const router = useRouter()
  const { isAuth } = useAuth();
  const { register, reset, handleSubmit, control } = useForm<CommentForm>({
    defaultValues: {
      content: "",
      targetId: movieId,
      targetType: "movie",
      spoil: false,
    },
  });
  const onsubmit = async (data: CommentForm) => {
    data["targetId"] = movieId;
    data["targetType"] = "movie";
    await fetchClient("/comment", "POST", data);
    router.refresh()
    reset();
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Title */}
      <div className="title flex gap-2 items-center">
        <MessageSquareTextIcon className="icon" />
        <span className="font-medium ">Bình luận</span>
      </div>

      {!isAuth && (
        <p className="text-accent text-sm">Vui lòng đăng nhập để bình luận</p>
      )}

      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-[#3D3B3B] p-4 rounded-md flex flex-col gap-2"
      >
        <Textarea
          placeholder="Viết bình luận"
          className="bg-[#1E1E1E] h-32"
          {...register("content", { required: true })}
        />

        {/* Button */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Controller
              name="spoil"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <span className="text-sm font-medium">Spoil</span>
          </div>
          <Button variant={"ghost"} className="flex items-center gap-2">
            <SendIcon />
            Gửi
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WriteCommentSection;
