'use client'
import { Input } from '@/components/ui/input'
import { MenuIcon, Search, SearchIcon } from 'lucide-react'
import Fuse from 'fuse.js'
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';


const SearchClient = ({movieMetadatas}: {movieMetadatas: MovieMinMetadataType[]}) => {
   // 1. Cấu hình Fuse
  const options = {
    keys: [
      { name: "name", weight: 0.7 },
      { name: "categories", weight: 0.2 },
      { name: "actors", weight: 0.2 },     
      { name: "director", weight: 0.1 },
    ],
    threshold: 0.3,          // nới lỏng hơn (0.0 = match chính xác, 1.0 = cực fuzzy)
    ignoreLocation: false,    // bỏ qua vị trí trong chuỗi
    minMatchCharLength: 1,   // cho phép match từ 1 ký tự
    includeScore: true,
  };

  // 2. Khởi tạo index + Fuse instance chỉ khi dữ liệu đổi
  const index = useMemo(
    () => Fuse.createIndex(options.keys!, movieMetadatas),
    [movieMetadatas]
  );
  const fuse = useMemo(
    () => new Fuse<MovieMinMetadataType>(movieMetadatas, options, index),
    [movieMetadatas, index]
  );

  const [searchInput, setSearchInput] = useState("")
  const [searchResult, setSearchResult] = useState<MovieMinMetadataType[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchInput(e.target.value)
  }

  // 5. Khi searchInput đổi → chạy Fuse search
  useEffect(() => {
    const q = searchInput.trim();
    if (!q) {
      setSearchResult([]);
      setIsOpen(false)
      return;
    }
    const result = fuse.search(q).map(r => r.item);
    setSearchResult(result);
    setIsOpen(true)
  }, [searchInput, fuse, movieMetadatas]);

  return (
    <div className='relative'>
      <div className="search-section w-80 flex items-center border-1 px-2 rounded-sm bg-foreground">
        <MenuIcon size={16} color="var(--color-black)" />
        <Input
          value={searchInput}
          placeholder="Tìm kiếm phim, thể loại"
          className="border-0 focus-visible:border-0 focus-visible:ring-0 bg-secondary text-background placeholder:text-muted"
          onChange={onSearch}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        />
        <SearchIcon size={16} color="var(--color-black)" />
      </div>
      {isOpen && (
        <div className="absolute p-2 top-full mt-1 left-0 w-full bg-foreground shadow-md rounded-sm z-50 max-h-96 overflow-y-auto">
          {searchResult.map((movie: MovieMinMetadataType) => (
            <Link 
              href={`/movie/${movie.slug}`}
              key={movie.id} className='text-background text-sm flex items-center gap-2 hover:underline'
              onMouseDown={()=>setTimeout(()=>setSearchInput(""), 150)}
            >
              <Search size={12}/>
              <span>{movie.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchClient