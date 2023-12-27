import React from 'react'

const Table = ({items}) => {
  return (
    <div className='table-container'>
      <table>
        {items.map((item) => (
          <tr>
            {Object.entries(item).map(([key, value]) => {
              return <td>
                  {JSON.stringify(value)}
                </td>
            })}
          </tr>
        ))}
     </table>
    </div>
  )
}

export default Table