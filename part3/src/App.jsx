import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Routes ,Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from "date-fns"

import api from "./api/posts"
import EditPost from './EditPost';


function App() {

  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate()

  
  useEffect(() => {
    
    async function fetchposts() {
    try {

      const response = await api.get("/posts")
      console.log("Response data:", response.data);
      setPosts(response.data)
      
      
    } catch (err) {
      if (err.response) {
         console.log(err.res.data);
      console.log(err.res.status);
      console.log(err.res.headers);
      } else {
        console.log(`error: ${err.message}`);
      }
    }
    }

    fetchposts()
    }
    
  , [])

  


  useEffect(() => {
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))

    setSearchResults(filteredResults.reverse())
    
  }, [posts, search])




  async function handleDelete(id) {

    try {
      await api.delete(`posts/${id}` )
      const newpostsafterdelete = posts.filter((item) => item.id !== id) 
      setPosts(newpostsafterdelete)
      navigate("/")
    } catch (error) {
      console.log(`Error: ${error}`);
      
    }
  }

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

  async function handleEdit(id) {
      const datetime = format(new Date(), 'MMMM dd, yyyy pp')
      const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`posts/${id}`, updatedPost)

      setPosts(posts.map((post)=> post.id === id ? {...response.data} : post))
      
      setEditBody("")
      setEditTitle("")
      navigate("/")

    } catch (error) {
      console.log(`Error: ${error}`);
    }
    
  }

  return (
    <div className="App">
      <Header title="First Ka App"/>
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route exact path='/' element={
          <Home
            posts={searchResults}
            
          />
        }
        />
        <Route exact path='/post' element={
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />}
        />
        <Route exact path='/edit/:id' element={
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />}
        />
        <Route exact path='/post/:id' element={ <PostPage posts={posts} handleDelete={handleDelete}/>}/>
        <Route exact path='/about' Component={About}/>
        <Route exact path='*' Component={Missing}/>
      </Routes>
      <Footer/>
    
    </div>
  );
}

export default App; 
