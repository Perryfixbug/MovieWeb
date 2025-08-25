import HeroClient from '@/components/hero/hero-client'
import { fetchAPI } from '@/lib/api'
import React from 'react'

export const revalidate = 60 

const Hero = async () => {
  const carousels = await fetchAPI('/carousel') 
  
  return (
    <HeroClient carousels={carousels}/>
  )
}

export default Hero