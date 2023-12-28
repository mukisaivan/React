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
import {format} from "date-fns"


function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

 
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');


  const navigate = useNavigate()


  function handleDelete(id) {
    const newpostsafterdelete = posts.filter((item) => item.id !== id) 
    setPosts(newpostsafterdelete)
    navigate("/")
  }

  function handleSubmit(e) {
    e.prevenDdefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    
    const newPost = { id, title: postTitle, datetime, body: postBody }
    
    const allPosts = [...posts, newPost]

    setPosts(allPosts)
    setPostTitle("")
    setPostBody("")

    navigate("/")
      
    
  }

  return (
    <div className="App">
      <Header title="First Ka App"/>
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route exact path='/'  element={<Home posts={posts} setPosts={setPosts}/> } />
        <Route exact path='/post' element={
          <NewPost
            handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody}
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
