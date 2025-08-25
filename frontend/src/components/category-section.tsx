import { dict } from '@/lib/dictionnary'
import { toTitleCase } from '@/lib/toCustomCase'
import Link from 'next/link'
import React from 'react'

const CategorySection = () => {
  const category = Object.keys(dict)
  return (
    <div className='px-5 w-full'>
      <h1 className='title text-lg'>Bạn đang quan tâm thể loại nào</h1>
      <div className='flex overflow-auto gap-2 space-y-2'>
        {category.map((name: string)=>(
          <Link href={`/category/${name}`} key={name} className='w-64 h-32 flex items-center justify-center bg-muted-foreground border-muted border-[1px] rounded-sm'>
            {toTitleCase(dict[name] ?? name)}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategorySection