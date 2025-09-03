"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/authContext";
import { fetchClient } from "@/lib/api";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Book, Heart, LogOut, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toAlias } from "@/lib/toCustomCase";

const ProfileButton = () => {
  const router = useRouter()
  const {logout, isAuth, userInfo} = useAuth()
  
  return (
    <div className="">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={userInfo?.avatar} alt={userInfo?.fullname} className="object-cover" />
            <AvatarFallback className="text-sm">{toAlias(userInfo?.fullname || "")}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 rounded-sm bg-background border-0" align="end">
          <DropdownMenuLabel>{userInfo?.fullname}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-muted/20"/>
          <DropdownMenuGroup>
            {/* Yêu thích */}
            <DropdownMenuItem>
              <Link href={'/profile'} className="flex justify-start items-center gap-2">
                <Heart />
                Yêu thích
              </Link>
            </DropdownMenuItem>
            {/* Danh sách */}
            <DropdownMenuItem>
              <Link href={'/profile'} className="flex justify-start items-center gap-2">
                <Book />
                Danh sách
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-muted/20" />
            {/* Tài khoản */}
            <DropdownMenuItem>
              <Link href={'/profile'} className="flex justify-start items-center gap-2">
                <User />
                Tài khoản
              </Link>
            </DropdownMenuItem>
            {/* Thoát */}
            <DropdownMenuItem onClick={()=>{
              logout()
              router.replace('/')
            }}>
              <Link href={'/profile'} className="flex justify-start items-center gap-2">
                <LogOut />
                Thoát
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;
