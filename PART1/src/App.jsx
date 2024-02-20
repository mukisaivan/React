import AnotherComponent from './AnotherComponent';
import './App.css';
import ListComponent from './listcomponent';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import ExerciseItem from './ExerciseItem';
import { useState, useEffect } from 'react';
import ColorInput from './ColorInput';
import apiRequest from './apiRequest';


function App() {

    //npx json-server -p 3500 -w data/db.json

        
    const [items, setItems] = useState(
        /*
        [
            {
                id: 1,
                isChecked: false,
                name: "item 1"
            },
            {
                id: 2,
                isChecked: false,
                name: "item 2"
            },
            {
                id: 3,
                isChecked: false,
                name: "item 3"
            }
        ]
        */
        []  // calls for items from localstorage
    );

    const [newItem, setNewItem] = useState("")
    const [search, setSearch] = useState("")
    const [color, setColor] = useState("")
    const [fetcherror, setFetchError] = useState(null)
    const [isLoading, setLoading] = useState(true)

    
    /*

    // making useEffect to save the items to local storage at every render when editing items
    useEffect(()=>{ localStorage.setItem("shoppinglist", JSON.stringify(items))}, [items])
    
    */

    // using useeffect to call the api

    const API_URL = " http://localhost:3500/items";


    useEffect(() => async function fetchapi() {
      try {
          const res = await fetch(API_URL); 
          const listItems = await res.json()
          if (!res.ok)  throw Error("Something went wrong");
          console.log(listItems);
          setItems(listItems)
          
      } catch (error) {
        console.log(`Error: ${error.message}`);
        setFetchError(error.message)    
      }
      finally {
          setLoading(false)
      }
    },[])


    const handleCheck2 = async (id) => {
        const listItems = items.map((item) => (
            item.id === id ? ({...item, isChecked :  !item.isChecked}) : (item)
        ))
       setItems(listItems)
        localStorage.setItem("shoppinglist", JSON.stringify(listItems));

        const updatedItem = listItems.filter( (item) => item.id === id)

        const updateOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({isChecked: updatedItem[0].isChecked})
        }

        const url = `${API_URL}/${id}`
        

        const result = await apiRequest(url, updateOptions)

        if (result) setFetchError(result);


    }


    const handleDelete =async (id)=>{
       const listItems =  items.filter((item) => (
            item.id !== id
       ))
        setItems(listItems)
        localStorage.setItem("shoppinglist", JSON.stringify(listItems));

        const deleteOptions = {
            method: "DELETE",
        }

        const url = `${API_URL}/${id}`

        const req = await apiRequest(url, deleteOptions)
        if(req) setFetchError(req)

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        addItemFunc(newItem)
        setNewItem('')
        console.log("submitted")
        console.log(newItem);
    }

    const addItemFunc = async (item) => {
        const id = items.length ? items[items.length - 1].id + 1 : 1;
        const mynewitem = { id: id, isChecked: false, name: item };
        const listItems = [...items, mynewitem];
        setItems(listItems);
        localStorage.setItem("shoppinglist", JSON.stringify(listItems))

        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mynewitem)
        }

        const result = await  apiRequest(API_URL, postOptions)
        if (result) setFetchError(result);

    }


    return (
        <div>
            
            <AnotherComponent word="My Goodness" />
            {/* <br /> */}
            <div style={{ paddingBottom: "3rem" }}></div>
            <SearchItem
                search={search}
                setSearch={setSearch}
            />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <main>
                {isLoading && <p style={{color: "blue"}}>list loading </p>}
                {fetcherror && <p style={{color: "red"}}> {`error: ${fetcherror}`}</p>}
                {!fetcherror && <ListComponent
                    componentName="List Component"
                    items={items.filter(item => (item.name).toLowerCase().includes(search.toLowerCase()))}
                    handleCheck2={handleCheck2}
                    handleDelete={handleDelete}
                    fetcherror={fetcherror}
                    setFetchError={setFetchError}
                />
                }

            </main>
           
                
          

                
            <p>Color changer assignment </p>
            <ColorInput
                color={color}
                setColor={setColor}
            />
            
            <ExerciseItem
                color={color}
                setColor={setColor}
            />
        </div>
    );
}





export default App;
