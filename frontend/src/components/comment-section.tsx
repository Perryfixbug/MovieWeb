"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/context/authContext'
import { MessageSquareTextIcon, Send, SendIcon } from 'lucide-react'
import React from 'react'

const CommentSection = () => {
  const { isAuth } = useAuth()
  return (
    <div className='flex flex-col gap-2'>
      {/* Title */}
      <div className='title flex gap-2 items-center'>
        <MessageSquareTextIcon className="icon" />
        <span className='font-medium '>Bình luận</span>
      </div> 

      {!isAuth && <p className='text-accent text-sm'>Vui lòng đăng nhập để bình luận</p>}

      <div className='bg-[#3D3B3B] p-4 rounded-md flex flex-col gap-2'>
        <Textarea 
          placeholder='Viết bình luận'
          className='bg-[#1E1E1E] h-32'
        />

        {/* Button */}
        <div className='flex justify-between'>
          <div className='flex items-center gap-2'>
            <Switch />
            <span className='text-sm font-medium'>Spoil</span>
          </div>
          <Button variant={"ghost"} className='flex items-center gap-2'>
            <SendIcon />
            Gửi
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CommentSection