import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';

const OrderSummary = (props) =>  {
const {order} = props;
let orderCountIndex = Object.keys(order).length-1;
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
                        </ListItem>
                }
                </div>
            ))
        }
    </Card>
    );
}   
export default OrderSummary;