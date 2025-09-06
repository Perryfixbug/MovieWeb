'use client'
import Movie from "@/components/movie";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/authContext";
import { toAlias } from "@/lib/toCustomCase";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Bookmark, LogOut, ThumbsUp, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfileClient = () => {
  const { userInfo } = useAuth()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [currentTab, setCurrentTab] = useState("like")

  //Xử lý sự kiện chuyển tab
  const handleTabChange = (value: string)=>{
    setCurrentTab(value)
    const newParams = new URLSearchParams(Array.from(searchParams.entries()))
    newParams.set("tab", value)
    router.push(`/profile/?tab=${value}`)
  }

  //Đồng bộ searchParams với currentTab
  useEffect(()=>{
    const tab = searchParams.get("tab");
    if (tab) setCurrentTab(tab);
  }, [searchParams])
  
  return (
    <div className="pt-16 px-5">
      <Tabs
        defaultValue={"like"}
        orientation="horizontal"
        className="flex flex-row gap-5"
        value={currentTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="h-[80vh] w-50 bg-muted/20 rounded-2xl flex flex-col justify-start items-start p-5 gap-5">
          <span className="text-lg">Quản lý tài khoản</span>
          <div className="flex flex-col w-full items-start gap-2">
            <TabsTrigger
              value="like"
              className="data-[state=active]:bg-accent/20 data-[state=active]:border-0 data-[state=active]:border-l-2 data-[state=active]:border-accent w-full justify-start"
            >
              <ThumbsUp style={{fill: "currentcolor"}} />
              Yêu thích
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-accent/20 data-[state=active]:border-0 data-[state=active]:border-l-2 data-[state=active]:border-accent w-full justify-start"
            >
              <Bookmark style={{fill: "currentcolor"}} />
              Danh sách
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-accent/20 data-[state=active]:border-0 data-[state=active]:border-l-2 data-[state=active]:border-accent w-full justify-start"
            >
              <User style={{fill: "currentcolor"}} />
              Tài khoản
            </TabsTrigger>
            <Button variant={"ghost"}>
              <LogOut />
              Đăng xuất
            </Button>
          </div>
        </TabsList>
        <TabsContent value="like" className="flex flex-col">
          <span>Yêu thích</span>
          <div className="flex gap-5">
            {userInfo?.likes ? userInfo?.likes?.map((movie: MovieType)=>(
              <Movie key={movie.id} movie_data={movie}/>
            )): 
              <span className="text-muted/70">Hãy chọn một phim bạn thích để đưa vào danh sách này</span>
            }
          </div>
        </TabsContent>
        <TabsContent value="list">
          <span>Danh sách</span>
          <div className="flex gap-5">
            {userInfo?.likes ? userInfo?.likes?.map((movie: MovieType)=>(
              <Movie key={movie.id} movie_data={movie}/>
            )): 
              <span className="text-muted/70">Hãy chọn một phim bạn thích để đưa vào danh sách xem sau</span>
            }
          </div>
        </TabsContent>
        <TabsContent value="account">
          <span>Tài khoản</span>
          <div className="grid grid-cols-8">
            <div className="info flex flex-col gap-5 col-span-4">
              <ul className="mt-2 w-full">
                <li>
                  <span className="text-muted text-sm">Email</span>
                  <p className="bg-muted/20 p-2 w-full rounded-sm overflow-clip">{userInfo?.email}</p>
                </li>
                <li>
                  <span className="text-muted text-sm">Tên tài khoản</span>
                  <p className="bg-muted/20 p-2 w-full rounded-sm overflow-clip">{userInfo?.username}</p>
                </li>
              </ul>
              <Button className="w-30">Cập nhật</Button>
              <p className="tex-sm text-muted/70">Đặt lại mật khẩu, nhấn vào <span className="text-accent">đây</span>.</p>
            </div>
            <div className="col-span-4 flex flex-col items-center justify-center gap-5">
              <Avatar className="border size-36 flex justify-center items-center overflow-clip">
                <AvatarImage src={userInfo?.avatar} className="w-full h-full"/>
                <AvatarFallback className="text-center text-3xl">{toAlias(userInfo?.fullname||"")}</AvatarFallback>
              </Avatar>
              <Button>Đổi ảnh đại diện</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileClient;
