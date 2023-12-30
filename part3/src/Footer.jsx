import React from 'react'
import { useStoreState } from 'easy-peasy'


const Footer = () => {
  
  const postCount = useStoreState(state=> state.postCount)

  return (
    <div className='Footer'>
      <p>{postCount} Blog Posts</p>
    
    </div>
  )
}

export default Footer