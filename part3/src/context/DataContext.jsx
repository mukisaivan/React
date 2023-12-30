import { createContext,useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import { format } from "date-fns"
import api from "../api/posts"
import useAxiosFetch from '../hooks/useAxiosFetch';


const DataContext = createContext({})

export function DataProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate()
  const {data, isLoading, fetchError} = useAxiosFetch("http://localhost:3500/posts")

    
  useEffect(() => {
    setPosts(data)
  }, [data])
  

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


  return(
    <DataContext.Provider value={{
      search, setSearch, searchResults, fetchError, isLoading,
      editBody, setEditBody, editTitle, setEditTitle, handleEdit,
      handleDelete, posts
    }}>
      {children}
    </DataContext.Provider>
  )


  
}


export default DataContext; 