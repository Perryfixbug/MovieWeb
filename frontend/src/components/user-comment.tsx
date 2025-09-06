export const revalidate = 60

import InteractionCommentSection from "@/components/interact-comment-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchServer } from "@/lib/api";
import { toAlias } from "@/lib/toCustomCase";
import UserCommentMenu from "@/components/user-comment-menu";

const CommentComponent = async ({ comment_data }: { comment_data: CommentType }) => {
  return (
    <div className="comment flex gap-2">
      <Avatar>
        <AvatarImage src={comment_data.user.avatar} />
        <AvatarFallback>{toAlias(comment_data.user.fullname)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        {/* Khối comment text, gói theo nội dung */}
        <div className="bg-background rounded-xl px-5 py-1 w-fit">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{comment_data.user.fullname}</span>
            <UserCommentMenu comment_data={comment_data}/>
          </div>
          <p className="text-muted break-words">{comment_data.content}</p>
        </div>
        <InteractionCommentSection comment_data={comment_data} rootId={null}/>
        {/* Reply */}
        <div className="reply">
          {comment_data?.replies?.map((comment: CommentType)=>(
            <div key={comment.id} className="flex gap-2">
              <Avatar>
                <AvatarImage src={comment.user.avatar} />
                <AvatarFallback>{toAlias(comment.user.fullname)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                {/* Khối comment text, gói theo nội dung */}
                <div className="bg-background rounded-xl px-5 py-1 w-fit">
                  <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment_data.user.fullname}</span>
                  {/* Dropdown menu */}
                  <UserCommentMenu comment_data={comment}/>
                </div>
                  <p className="text-muted break-words">{comment.content}</p>
                </div>
                <InteractionCommentSection comment_data={comment} rootId={comment_data.id}/>
              </div>
            </div>
          ))}
        </div>
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