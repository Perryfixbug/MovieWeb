export const revalidate = 60

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchServer } from "@/lib/api";
import { toAlias } from "@/lib/toCustomCase";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

const CommentComponent = async ({ comment_data }: { comment_data: CommentType }) => {
  return (
    <div className="comment flex gap-2">
      <Avatar>
        <AvatarImage src={comment_data.user.avatar} />
        <AvatarFallback>{toAlias(comment_data.user.fullname)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="bg-background rounded-xl px-5 py-1">
          <span className="font-medium text-sm">
            {comment_data.user.fullname}
          </span>
          <p className="text-muted">{comment_data.content}</p>
        </div>
        <ul className="flex items-center gap-2 px-5">
          <li className="cursor-pointer hover:text-accent">
            <ArrowBigUp className="icon" />
          </li>
          <li className="cursor-pointer hover:text-accent">
            <ArrowBigDown className="icon" />
          </li>
          <li className="cursor-pointer hover:underline hover:text-accent">
            Trả lời
          </li>
        </ul>
      </div>
    </div>
  );
};

const UserComment = async ({movieId}: {movieId: number}) => {
  const comments = await fetchServer(`/comment/movie/${movieId}`) as CommentType[]
  return (
    <div className="flex flex-col gap-2 overflow-auto">
      {comments?.map((comment: CommentType) => (
        <CommentComponent key={comment.id} comment_data={comment} />
      ))}
    </div>
  )
}

export default UserComment