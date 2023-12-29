import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function EditPost({posts, editBody, setEditBody, editTitle, setEditTitle, handleEdit}) {
 
  const { id } = useParams()
  const post = posts.find((post)=> (post.id).toString() === id)

 

  useEffect(() =>{
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  },[post, setEditTitle, setEditBody])

  return (

    <div className='NewPost'>
      { editTitle &&
        <>
          <h1>Edit Post</h1>
          <form className='newPostForm' onSubmit={(e)=> e.preventDefault()}>
            
            <div style={{display:"flex", marginTop:"20px"}}>
              <label htmlFor="postTitle" style={{color:"red"}}>Title:</label>
              <input
                id="postTitle"
                style={{ margin: "5px 10px" }} type="text"
                placeholder='Input post TItle'
                required
                value={editTitle}
                onChange={(e)=>setEditTitle(e.target.value)}
              />
            </div>
            <label htmlFor="postBody">Post:</label>
            <textarea
                id="postBody"
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
            />
            <button onClick={()=>handleEdit(post.id)}>Edit</button>
          </form>
        </>
      } 
      {
        !editTitle &&
        <>
          <>
            <p>This post does not exist</p>
          <Link to="/">Visit our Home Page</Link>
          </>
        </>
      }
      
    </div>
  )
}

export default EditPost