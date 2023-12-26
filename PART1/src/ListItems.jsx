function ListItems   ({ items ,handleCheck2, handleDelete }) {
    return (  
        <ul>
            {items.map((item) => (
                <li className="item" key={item.id}>
                    <input
                        type="checkbox"
                        name="" id=""
                        checked={item.isChecked}
                        onChange={() => handleCheck2(item.id)}
                    />
                    <label htmlFor="" style={item.isChecked ? ({ textDecoration: 'line-through' }) : (null)}>{item.name}</label>
                    <button
                        onClick={() => handleDelete(item.id)}
                        type="button">Delete
                    </button>
                    
                </li>
            ))}
        </ul>
    );
}


export default ListItems