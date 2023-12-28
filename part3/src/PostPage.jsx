import { useParams, Link } from 'react-router-dom'


import React from 'react'

const PostPage = ({ posts, handleDelete }) => {
  
  const {id} = useParams()
  const post = posts.find((post)=> (post.id).toString()===id) 

  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>
                Delete Post
            </button>
          </>
        }
        {
          !post &&
          <>
            <p>This post does not exist</p>
          <Link to="/">Visit our Home Page</Link>
          </>
          
        }

      </article>
     
    </main>
  )
}

export default PostPage