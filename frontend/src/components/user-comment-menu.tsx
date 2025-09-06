"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/authContext'
import { fetchClient } from '@/lib/api'
import { Ellipsis } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const UserCommentMenu = ({comment_data}: {comment_data: CommentType}) => {
  const {userInfo} = useAuth()
  const router = useRouter()
  if(userInfo?.id != comment_data?.user.id) return

  const handleDeleteComment = async ()=>{
    await fetchClient(`/comment/${comment_data.id}`, "DELETE")
    router.refresh()
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="">
        <Ellipsis className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup >
          <DropdownMenuItem onClick={handleDeleteComment}>Xóa</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserCommentMenu