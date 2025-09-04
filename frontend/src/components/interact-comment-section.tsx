"use client";
import { useAuth } from "@/context/authContext";
import { fetchClient, fetchServer } from "@/lib/api";
import { ArrowBigDown, ArrowBigUp, Send, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const InteractCommentSection = ({
  comment_data,
  rootId
}: {
  comment_data: CommentType,
  rootId: number | null

}) => {
  const router = useRouter()
  const {userInfo} = useAuth()
  //Khởi tạo số vote
  const initialVote = useMemo(() => {
    if (!Array.isArray(comment_data?.votes)) return 0;
    return comment_data.votes.reduce(
      (value: number, vote: VoteType) =>
        value + (vote.value === true ? 1 : -1),
      0
    );
  }, [comment_data?.votes]);

  //Check xem user hiện tại vote chưa
  const userVote = useMemo(() => {
    return comment_data?.votes?.find((vote: VoteType)=>vote.userId == Number(userInfo?.id))?.value ?? null
  }, [comment_data.votes, userInfo?.id]);

  const [vote, setVote] = useState(initialVote);
  const [myVote, setMyVote] = useState<boolean | null>(userVote)  //null = chưa vote, true = up, false = down
  const [replyOpen, setReplyOpen] = useState(false)
  const [relpyContent, setReplyContent] = useState("@"+comment_data.user.fullname+" ")
  //Đồng bộ myVote khi userVote thay đổi
  useEffect(() => {
    setMyVote(userVote);
  }, [userVote]);

  const onChangeVote = async (value: boolean) => {
    //Chưa đăng nhập, lưu vào sessionStorage
    if (!userInfo?.id) {
      return
    } 

    let newVote = vote
    //Ấn lại -> bỏ vote
    if(myVote == value){
      newVote += value ? -1 : 1
      try{
        setMyVote(null)
        await fetchServer("/vote","DELETE", {
          "userId": userInfo.id,
          "commentId": comment_data.id,
          "value": value
        })
      }catch(e){
        console.log(e);
      }
    }
    else{
      //Đang up -> down -2, đang down -> up +2, chưa vote +-1
      if(myVote == true && value == false) newVote -= 2
      else if(myVote == false && value == true) newVote += 2 
      else newVote += value ? 1 : -1

      try{
        setMyVote(value)
        await fetchServer("/vote","POST", {
          "userId": userInfo.id,
          "commentId": comment_data.id,
          "value": value
        })
      }catch(e){
        console.log(e);
      }
    }

    setVote(newVote)
  };

  const onReplyComment = async(e: React.FormEvent)=>{
    e.preventDefault()
    if(!relpyContent.trim()) return 

    await fetchClient('/comment', "POST", {
      targetId: rootId ?? comment_data.id,
      targetType: "comment",
      content: relpyContent,
    })
    setReplyContent("@"+comment_data.user.fullname+" ")
    setReplyOpen(false)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex items-center gap-2 px-5">
        <li className={`${myVote !== null ? "text-accent" : ""}`}>{vote}</li>
        <li className={`cursor-pointer hover:text-accent`}
          onClick={()=>onChangeVote(true)}
        >
          <ArrowBigUp 
            className={`icon`}
            stroke={`${myVote == true ? "var(--accent)" : "currentColor"}`}
            fill={`${myVote == true ? "var(--accent)" : "none"}`}
          />
        </li>
        <li className={`cursor-pointer hover:text-accent`} 
          onClick={()=>onChangeVote(false)}
        >
          <ArrowBigDown 
            className={`icon`} 
            stroke={`${myVote == false ? "var(--accent)" : "currentColor"}`}
            fill={`${myVote == false ? "var(--accent)" : "none"}`}
          />
        </li>
        <li className="cursor-pointer hover:underline hover:text-accent" onClick={()=>setReplyOpen(!replyOpen)}>
          Trả lời
        </li>
      </ul>
      {replyOpen && 
      <form className="flex ml-2 gap-1" onSubmit={(e)=>onReplyComment(e)}>
        <Input 
          autoFocus
          className="w-full"
          value={relpyContent}
          onChange={(e)=>setReplyContent(e.target.value)}
        />
        <Button variant={"ghost"}>
          <Send />
          Gửi
        </Button>
        <Button variant={"ghost"} onClick={(e)=>{
          e.preventDefault()
          setReplyOpen(false)
        }}>
          <X />
        </Button>
      </form>}
    </div>
  );
};

export default InteractCommentSection;
