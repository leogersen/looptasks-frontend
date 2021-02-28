import React, { useContext } from 'react'
import { CounterContext } from './CounterComposed'


const Counter = () => {
    const counter = useContext(CounterContext);

    return (
        <div className="App">
            <center>
                <h1>{counter.value}</h1>
                <input type="button" value="Incrementar" onClick={() => counter.increment()}  />
            </center>
            </div>
    );
}

export default Counter;