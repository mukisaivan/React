import { useRef } from "react"


function AddItem({ newItem, setNewItem, handleSubmit }) {
    const inputRef = useRef();

    return (
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="addItemFunc">Add Item</label>
            <input
                autoFocus
                ref={inputRef}
                type="text"
                id="addItemFunc"
                placeholder="Add item"
                required
                value={newItem}
                onChange={ (e) => setNewItem(e.target.value)}
            />
            
            <button type="submit" onClick={()=>inputRef.current.focus()} >+</button>
        </form>
    )
}


export default AddItem 