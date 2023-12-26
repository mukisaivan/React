import React from 'react'

const SearchItem = ({search, setSearch}) => {
  return (
      <form htmlFor="searchForm" onSubmit={(e)=>{e.preventDefault()}}>
      <label htmlFor="label">Search Items</label>
        <input
          autoFocus
          type="text"
          role='searchbox'
          placeholder='Search Items'
          value={search}
          onChange={(e)=>setSearch( e.target.value)}
        />     
    </form>
  )
}

export default SearchItem