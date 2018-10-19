import React from 'react';
 
function Inventory(props){
    return (
    <div>
        <h1>
            Inventory: {props.milk}
            
        </h1>
    </div>
    );
}

export default Inventory;