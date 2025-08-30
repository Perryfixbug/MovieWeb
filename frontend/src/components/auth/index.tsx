"use client"
import ForgetPassword from '@/components/auth/forget-password'
import Login from '@/components/auth/login'
import Signup from '@/components/auth/signup'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React, { useState } from 'react'

const AuthComponent = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: any}) => {
  const [type, setType] = useState<"login" | "signup" | "forget-password">("login")
  if (!isOpen) return null
  return(
    <div className='fixed w-full top-0 h-full flex justify-center items-center' onClick={()=>setIsOpen(false)}>
      <div
        className='relative'
        onClick={(e) => e.stopPropagation()} // chặn click trong form
      >
        <Button onClick={()=>setIsOpen(false)} className="absolute top-0 right-0 z-20 hover:bg-muted/5 hover:text-accent " variant={"ghost"}>
          <X />
        </Button>
        {type === "login" && <Login setType={setType} />}
        {type === "signup" && <Signup setType={setType}  />}
        {type === "forget-password" && <ForgetPassword setType={setType}  />}
      </div>

    </div>
  )
}

export default AuthComponent