import React from 'react'
import ListItem from './ListItem'

const ListItems = ({ items, setItems }) => {
  
  
  return (
    <ul>
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}

        
        />
      ))}
      
      
    </ul>
  )
}

export default ListItems