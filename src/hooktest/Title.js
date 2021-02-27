import React, { useState } from 'react'


const Title = () => { 
    const [ title, setTitle ] = useState(null);

    return (

        <div className="App"> 
            <form>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </form>
        
        </div>
    );
}

export default Title;

