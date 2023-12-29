import React from 'react'

const NewPost = ({ handleSubmit, postTitle, setPostTitle, postBody, setPostBody}) => {
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