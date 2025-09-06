import LoginButton from "@/components/login-button";
import SearchInput from "@/components/search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { fetchServer } from "@/lib/api";
import { dict } from "@/lib/dictionnary";
import { toTitleCase } from "@/lib/toCustomCase";
import { Menu, MenuIcon, Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = async () => {
  const categories = await fetchServer("/category");
  const countries = await fetchServer("/movie/country");
  
  return (
    <>
      {/* Giao diện mobile */}
      <div className="mobile sm:hidden flex justify-between items-center fixed w-full px-5 py-2 z-50">
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
      <div className="desktop hidden sm:flex justify-between items-center fixed w-full px-5 py-2 z-20">
        <div className="main-section flex items-center gap-5">
          <Avatar className="p-2">
            <AvatarImage src="/vercel.svg" alt="logo" />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <Link href={"/"} className="font-bold">
            QUẠC PHIM
          </Link>
          {/* Search part */}
          <SearchInput />
          {/* Category part */}
          <NavigationMenu className="">
            <NavigationMenuList className="justify-between w-[500px]">
              {/* Thể loại */}
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger>Thể loại</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 w-[500px]">
                    {categories.map((category: CategoryType) => (
                      <NavigationMenuLink asChild key={category.id}>  
                        <Link href={`/category/${category.value}`}>
                          {toTitleCase(
                            dict[category.value] ?? category.value
                          )}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* Phim bộ */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={`/type/serie`}>Phim bộ</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* Phim lẻ */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={`/type/movie`}>Phim lẻ</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* Quốc gia */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Quốc gia</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 w-[500px]">
                    {countries.map((country: string) => (
                      <NavigationMenuLink asChild key={country}>
                        <Link href={`/country/${country}`}>
                          {toTitleCase(dict[country] ?? country)}
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* Diễn viên */}
              <NavigationMenuItem>Diễn viên</NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <LoginButton />
      </div>
    </>
  );
};

export default NavBar;
