import React from 'react'
import { useTitle } from './useTitle';


const Title = () => { 
    const title = useTitle("Título");


    return (

        <div className="App"> 
            <form>
                <input type="text" value={title.title} onChange={e => title.changeTitle(e.target.value)} />
            </form>
        
        </div>
    );
}

export default Title;

