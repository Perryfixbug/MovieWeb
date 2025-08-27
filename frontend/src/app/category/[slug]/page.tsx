import { fetchAPI } from '@/lib/api'
import React from 'react'

export async function generateStaticParams() {
  const categories = await fetchAPI('/category')
  return categories.map((category: CategoryType)=>({
    slug: category.value
  }))
}

const Category = async ({params}:{params: Promise<{slug: string}>}) => {
  const {slug} = await params
  

  return (
    <div>{slug}</div>
  )
}

export default Category