"use client";
import AuthComponent from "@/components/auth";
import ProfileButton from "@/components/profile-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/context/authContext";
import React, { useState } from "react";

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth } = useAuth()
  if(isAuth) return <ProfileButton />
  return (
    <>
      <Button
        variant={"secondary"}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="z-20"
      >
        Đăng nhập
      </Button>
      <AuthComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
  // return(
  //   <div>
  //     <Dialog>
  //       <DialogTrigger>
  //         Đăng nhập
  //       </DialogTrigger>
  //       <DialogContent className="w-[800px] h-[500px]">
  //         <AuthComponent />
  //       </DialogContent>
  //     </Dialog>
  //   </div>
  // )
};

export default LoginButton;
