import React from 'react'

const NewPost = ({ handleSubmit, postTitle, setPostTitle, postBody, setPostBody}) => {
  return (
    <div className='NewPost'>
      <h1>NewPost</h1>
      <form className='newPostForm' onSubmit={handleSubmit}>
        
        <div style={{display:"flex"}}>
          <label htmlFor="postTitle">Title</label>
          <input style={{margin:"5px 10px"}}  type="text" />
        </div>
        
       
        
      </form>
    </div>
  )
}

export default NewPost