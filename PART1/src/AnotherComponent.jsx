import { useState } from 'react';



function AnotherComponent( {word} ) {

    const [count, setCount] = useState(0);

    const increamentCounter  = () =>{
        setCount(count + 1);
        console.log(count);
    }

    return (

        <main>
            <h2>{word}</h2>

            <h1>{count}</h1>
            <button onClick={increamentCounter}>Increment</button>
        </main>
    );
}

// if the prop values are not provided you provided a default component to fetch them from there

AnotherComponent.defaultProps = {
    word : "fori",
}

export default AnotherComponent;