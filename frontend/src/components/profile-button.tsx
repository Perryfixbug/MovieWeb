import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Book, Heart, LogOut, User } from "lucide-react";
import React from "react";

const ProfileButton = () => {
  return (
    <div className="pt-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="m-auto w-10 aspect-square rounded-full border-white bg-accent"></div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 rounded-sm bg-background border-muted" align="end">
          <DropdownMenuLabel>Hiếu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* Yêu thích */}
            <DropdownMenuItem>
              <Heart />
              Yêu thích
            </DropdownMenuItem>
            {/* Danh sách */}
            <DropdownMenuItem>
              <Book />
              Danh sách
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* Tài khoản */}
            <DropdownMenuItem>
              <User />
              Tài khoản
            </DropdownMenuItem>
            {/* Thoát */}
            <DropdownMenuItem>
              <LogOut />
              Thoát
            </DropdownMenuItem>

          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;
