import { useParams, Link } from 'react-router-dom'

import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams()


  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);
  
  const navigate = useNavigate()

  

  async function handleDelete(id) {
    deletePost(id)
    navigate("/")
  }

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