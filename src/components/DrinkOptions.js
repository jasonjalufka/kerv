import React from "react";
import drinks from "../data/drinks";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

let DrinkOptions = props => {
    return (
        <List>
            {Object.keys(drinks).map((drink, index) => (
                <ListItem button key={index} onClick={() => props.input.value = drink}>
                    <ListItemText primary={drink} />
                </ ListItem>
            ))
            }
        </List >
    )
}
export default DrinkOptions;