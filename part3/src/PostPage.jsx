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
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                Delete Post
          </button>
          
          <Link
            to={`/edit/${post.id}`}
            className="editButton"
            style={{
              display:"flex", color:"white", textDecoration:"none",
              backgroundColor: "blue", height: "50px", width: "100px",
              borderRadius: "20px", alignItems: "center", justifyContent: "center",
              position: "relative",
              left: "200px", border:"solid 2px black",
              bottom: "50px",
              transition: "background-color 0.3s ease, color 0.3s ease", 
            }}>
            Edit Post
          </Link>
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