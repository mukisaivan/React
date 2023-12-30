import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Routes ,Route } from 'react-router-dom';
import EditPost from './EditPost';
import { DataProvider } from './context/DataContext';

import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions(actions=> actions.setPosts)

  const {data, isLoading, fetchError} = useAxiosFetch("http://localhost:3500/posts")

    
  useEffect(() => {
    setPosts(data)
  }, [data, setPosts])
  


  return (
    <div className="App">
      <Header title="React App" />
      <DataProvider>
        <Nav />
        <Routes>
          <Route exact path='/' element={
            <Home
              isLoading={isLoading}
              fetchError={fetchError}
            />} />
          <Route exact path='/post' element={ <NewPost />}/>
          <Route exact path='/edit/:id' element={<EditPost />} />
          <Route exact path='/post/:id' element={ <PostPage />}/>
          <Route exact path='/about' Component={About}/>
          <Route exact path='*' Component={Missing}/>
        </Routes>
      </DataProvider> 
        <Footer/>
      

 
      
    </div>
  );
}

export default App; 
