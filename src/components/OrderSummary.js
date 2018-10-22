import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import drinks from "../data/drinks";
import milkCost from "../data/milkCost";

const OrderSummary = (props) =>  {
const {order} = props;
let orderCountIndex = Object.keys(order).length-1;

let getTotal = orderKey => {
    let itemCost = 0;
    itemCost = drinks[order[orderKey].drinkOption].price + milkCost[order[orderKey].milkOption];
    return itemCost;
}
return(
    <Card>
        {
            Object.keys(order).map((orderKey, index) => (
                <div key={index}>
                {
                    index!=orderCountIndex&&<ListItem>
                        <ListItemText primary={order[orderKey].drinkOption}/>
                        <ListItemText primary={order[orderKey].beanOption}/>
                        <ListItemText primary={order[orderKey].milkOption}/>
                        <ListItemText primary={'$' + getTotal(orderKey)}/>
                    </ListItem>
                        
                }
                </div>
            ))
        }
    </Card>
    );
}   
export default OrderSummary;