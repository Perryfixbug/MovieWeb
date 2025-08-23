import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Menu, MenuIcon, Search, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <>  
      {/* Giao diện mobile */}
      <div className='mobile lg:hidden flex justify-between items-center fixed w-full px-5 py-2 z-50'>
        <div className='main-section flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu color='var(--color-white)'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuItem></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className='p-2'>
            <AvatarImage src='/vercel.svg' alt='logo'/>
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <Link href={'/'} className='font-bold'>QUẠC PHIM</Link>
        </div>
        <div className='search-section'>
          <Search />
        </div>
      </div>

      {/* Giao diện desktop */}
      <div className='desktop hidden lg:flex justify-between items-center fixed w-full px-5 py-2 z-50'>
        <div className='main-section flex items-center gap-5'>
          <Avatar className='p-2'>
            <AvatarImage src='/vercel.svg' alt='logo'/>
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <Link href={'/'} className='font-bold'>QUẠC PHIM</Link>
          <div className='search-section w-80 flex items-center border-1 px-2 rounded-sm bg-foreground'>
            <MenuIcon 
              size={16} 
              color='var(--color-black)'
            />
            <Input 
              placeholder='Tìm kiếm phim, tên diễn viên'
              className='border-0 focus-visible:border-0 focus-visible:ring-0 bg-foreground text-background'
            />
            <SearchIcon
              size={16}
              color='var(--color-black)'
            />
          </div>
          <ul className='categroy-section flex w-[500px] justify-between items-center'>
            <li>Chủ đề</li>
            <li>Thể loại</li>
            <li>Phim bộ</li>
            <li>Phim lẻ</li>
            <li>Quốc gia</li>
            <li>Diễn viên</li>
          </ul>
        </div>
        <Button
            variant={"secondary"}
        >Đăng nhập</Button>
      </div>
    </>
  )
}

export default NavBar