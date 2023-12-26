
import ListItems from "./ListItems";
function ListComponent({ items, handleCheck2, handleDelete }) {


    /*  
    const handleCheck = (id) => {
        for (let int = 0; int < items.length; int++) {
               const element = items[int];
            if (element.id === id) {
                   console.log(id);
                element.isChecked = !element.isChecked;
                const updatedItems = [...items];
                updatedItems[int] = element;
                setItems(updatedItems);
            }
        }
    }

    */


    return (
        <>
            {items.length ? (
                <ListItems
                    handleCheck2={handleCheck2}
                    handleDelete={handleDelete}
                    items={items}
                />

            ) : (
                    <p style = {{marginTop: "2rem"}}>Your list is empty</p>
            )}
            
        </>

    );
}



export default ListComponent; 

