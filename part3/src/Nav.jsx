import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search,setSearch}) => {
  return (
    <div className='Nav'>
      <form className="searchForm" onSubmit={(e)=> e.preventDefault()}>
        <label htmlFor="search">Search Form</label>
        <input
          type="text"
          name="search"
          placeholder='Search Posts'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
         
        </ul>
      </form>
    </div>
  )
}

export default Nav