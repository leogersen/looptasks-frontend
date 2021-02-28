import React, { useEffect } from 'react'
import { useMouseMove } from './useMouseMove';
import { useTitle } from './useTitle';

const MouseMove = () => {
    const coords = useMouseMove();
    const { changeTitle } = useTitle();


    useEffect(() => {
        changeTitle(`X: ${coords.x}, Y ${coords.y}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coords.x, coords.y]);

    return (
        <div className="Ap">
            <center>
                <br />
                <h1>X: {coords.x}</h1>
                <h1>Y: {coords.y}</h1>
            </center>

        </div>
    )

}


export default MouseMove;