import HeroClient from '@/components/hero/hero-client'
import { fetchServer } from '@/lib/api'
import React from 'react'

export const revalidate = 60 

const Hero = async () => {
  const carousels = await fetchServer('/carousel') 
  
  return (
    <HeroClient carousels={carousels}/>
  )
}

export default Hero