import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const CategorySection = () => {
  const category = ['Hành động', 'Hài', 'Tình cảm', 'Khoa học', 'Marvel', 'Hoạt hình', 'Kinh dị', 'Trung Quốc', 'Hàn Quốc']
  return (
    <div className='px-5 w-full'>
      <h1 className='title text-lg'>Bạn đang quan tâm thể loại nào</h1>
      <div className='flex overflow-auto gap-2 space-y-2'>
        {category.map((name: string)=>(
          <Card key={name} className='w-64 h-32 flex items-center justify-center'>
            <CardContent className=''>
              {name}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CategorySection