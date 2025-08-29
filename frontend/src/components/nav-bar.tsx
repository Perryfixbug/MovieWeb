import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { fetchAPI } from "@/lib/api";
import { dict } from "@/lib/dictionnary";
import { toTitleCase } from "@/lib/toCustomCase";
import { Menu, MenuIcon, Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = async () => {
  const categories = await fetchAPI("/category");
  const countries = await fetchAPI("/movie/country");
  return (
    <>
      {/* Giao diện mobile */}
      <div className="mobile lg:hidden flex justify-between items-center fixed w-full px-5 py-2 z-50">
        <div className="main-section flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu color="var(--color-white)" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuItem></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="p-2">
            <AvatarImage src="/vercel.svg" alt="logo" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <Link href={"/"} className="font-bold">
            QUẠC PHIM
          </Link>
        </div>
        <div className="search-section">
          <Search />
        </div>
      </div>

      {/* Giao diện desktop */}
      <div className="desktop hidden lg:flex justify-between items-center fixed w-full px-5 py-2 z-50">
        <div className="main-section flex items-center gap-5">
          <Avatar className="p-2">
            <AvatarImage src="/vercel.svg" alt="logo" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <Link href={"/"} className="font-bold">
            QUẠC PHIM
          </Link>
          <div className="search-section w-80 flex items-center border-1 px-2 rounded-sm bg-foreground">
            <MenuIcon size={16} color="var(--color-black)" />
            <Input
              placeholder="Tìm kiếm phim, tên diễn viên"
              className="border-0 focus-visible:border-0 focus-visible:ring-0 bg-secondary text-background placeholder:text-muted"
            />
            <SearchIcon size={16} color="var(--color-black)" />
          </div>
          <NavigationMenu className="">
            <NavigationMenuList className="justify-between w-[500px]">
              {/* Thể loại */}
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger>
                  Thể loại
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-3 w-[500px]">
                    {categories.map((category: CategoryType) => (
                      <li key={category.value}>
                        <NavigationMenuLink
                          href={`/category/${category.value}`}
                        >
                          {toTitleCase(dict[category.value] ?? category.value)}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* Phim bộ */}
              <NavigationMenuItem>
                <NavigationMenuLink href={`/type/serie`}>
                  Phim bộ
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* Phim lẻ */}
              <NavigationMenuItem>
                <NavigationMenuLink href={`/type/movie`}>
                  Phim lẻ
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* Quốc gia */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Quốc gia
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid grid-cols-3 w-[500px]">
                    {countries.map((country: string) => (
                      <li key={country}>
                        <NavigationMenuLink
                          href={`/country/${country}`}
                        >
                          {toTitleCase(dict[country] ?? country)}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
              </NavigationMenuContent>
              </NavigationMenuItem>
              {/* Diễn viên */}
              <NavigationMenuItem>Diễn viên</NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Button variant={"secondary"}>Đăng nhập</Button>
      </div>
    </>
  );
};

export default NavBar;
