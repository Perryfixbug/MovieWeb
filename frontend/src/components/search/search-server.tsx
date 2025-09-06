import SearchClient from '@/components/search/search-client'
import { fetchServer } from '@/lib/api'
import React from 'react'

const SearchServer = async () => {
  const movieMetadatas = await fetchServer('/search')
  
  return (
    <SearchClient movieMetadatas={movieMetadatas}/>
  )
}

export default SearchServer