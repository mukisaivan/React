import React, { useContext } from 'react'
import DataContext from './context/DataContext'
import { useState } from 'react'

import {useNavigate } from 'react-router-dom';
import { format } from "date-fns"
import api from "./api/posts"

const NewPost = () => {
  
  const { posts, setPosts } = useContext(DataContext)
  const navigate = useNavigate()
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

    async function handleSubmit()  {
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const res = await  api.post("/posts", newPost)
      
       const allPosts = [...posts, res.data]
      //  const allPosts = [...posts, newPost]

      setPosts(allPosts)
      setPostTitle("")
      setPostBody("")
      navigate("/")
    } catch (error) {
      console.log(`Error: ${error}`);
    }
 
  }


  return (
    <div className='NewPost'>
      <h1>NewPost</h1>
      <form className='newPostForm' onSubmit={handleSubmit}>
        
        <div style={{display:"flex", marginTop:"20px"}}>
          <label htmlFor="postTitle" style={{color:"red"}}>Title:</label>
          <input
            id="postTitle"
            style={{ margin: "5px 10px" }} type="text"
            placeholder='Input post TItle'
            required
            value={postTitle}
            onChange={(e)=>setPostTitle(e.target.value)}
          />
        </div>
        <label htmlFor="postBody">Post:</label>
        <textarea
            id="postBody"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewPost