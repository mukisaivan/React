import { useState } from 'react';
import { useEffect } from 'react';

import Form from './Form';
import Table from './Table';

function App() {

  const API_URL = "https://jsonplaceholder.typicode.com/";

  const [reqType, setReqType] = useState("users");
  const [items, setItems] = useState([]);


  useEffect(() => {
    async function fetchItems() {
      try {
        
        const res = await fetch(`${API_URL}${reqType}`)
        
        const data = await res.json()
        setItems(data)
          console.log(data);

        
        } catch (error) {
          console.log(error);
        }
    }
    fetchItems()

  }, [reqType])


  
    return (
      <div className="App" >
        <Form
          reqType={reqType}
          setReqType={setReqType}
        />
        
        <div  className="content">
          <br />
          {/* <Items
            items={items}
            setItems={setItems}
          /> */}
          <Table
            items={items}
          />

        </div>
        

    
      </div>
    );
}

export default App;