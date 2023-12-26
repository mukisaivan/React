import React from 'react'

const ColorInput = ({color,setColor}) => {
  return (
     <div className='colorinput'>
        <label id="Write Color"/>
        <input
            type="text"
            autoFocus
            required  
              placeholder='Input color'
              value={color}
              onChange={(e)=>setColor(e.target.value)}
        />
    </div>
  )
}

export default ColorInput