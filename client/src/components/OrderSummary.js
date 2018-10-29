import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const OrderSummary = (props) => {
    const { order } = props;
    let orderCountIndex = Object.keys(order).length - 1;

    return (
        <Card>
            {
                Object.keys(order).map((orderKey, index) => (
                    <div key={index}>
                        {
                            (index !== orderCountIndex) && (index !== orderCountIndex - 1) && <ListItem>
                                <ListItemText primary={order[orderKey].drinkOption} />
                                <ListItemText primary={order[orderKey].beanOption} />
                                <ListItemText primary={order[orderKey].milkOption} />
                                <ListItemText primary={'$' + order[orderKey].total} />
                            </ListItem>
                        }
                    </div>
                ))
            }
            <ListItem>
                <ListItemText primary={'Total ($' + order.orderTotal + ')'} />
                <Button variant="contained" color="primary"
                    onClick={() => props.placeOrder(order)}>Place Order</Button>
            </ListItem>

        </Card>
    );
}
export default OrderSummary;