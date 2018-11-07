import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {List, ListSubheader} from '@material-ui/core/';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        width: '100%'
    },
    textRight: {
        textAlign: 'right',
    },
    textLeft: {
        textAlign: 'left',
        paddingLeft: 0,
        marginLeft: 0

    },
})
const OrderSummary = (props) => {
    const { hasTip, addTip, classes, order } = props;
    
    let orderCountIndex = Object.keys(order).length - 1;

    return (
        <Card>
            <List>
            {
                Object.keys(order).map((orderKey, index) => (
                    <div key={index}>
                        {
                            (index !== orderCountIndex) && (index !== orderCountIndex - 1) && <ListItem>
                                <ListItemText className={classes.textLeft} primary={order[orderKey].drinkOption} 
                                    secondary={( order[orderKey].milkOption !== 'whole' && order[orderKey].drinkOption !== 'espresso') ? '+ $' + props.milk[order[orderKey].milkOption].price + ' ' + order[orderKey].milkOption  : ''} />
                                <ListItemText className={classes.textRight}primary={'$' + order[orderKey].total} />
                            </ListItem>
                        }
                    </div>
                ))
            }
            <ListItem>
                <ListItemText className={classes.textLeft} primary={'Tip'} />
                <ListItemText className={classes.textRight} primary={'$'+hasTip}/>
            </ListItem>
            <Divider />
            </List>


            <List subheader={<ListSubheader component="div">Tip</ListSubheader>} style={{display: 'flex',flexDirection: 'row'}}>
            <ListItem button onClick={() => addTip(0)}selected={hasTip === 0}><ListItemText className={classes.textLeft} primary={'$0'} /></ListItem>
            <ListItem button onClick={() => addTip(1)}selected={hasTip === 1}><ListItemText className={classes.textLeft} primary={"$1"} /></ListItem>
            <ListItem button onClick={()=> addTip(2)} selected={hasTip === 2}><ListItemText className={classes.textLeft} primary={"$2"} /></ListItem>
            <ListItem button onClick={() => addTip(3)} selected={hasTip === 3}><ListItemText className={classes.textLeft} primary={"$3"} /></ListItem>
            </List>
            
            
                <Button className={classes.button}variant="contained"
                    color="primary"
                    onClick={() => props.placeOrder(order, hasTip)}>Charge ${props.order.orderTotal + hasTip}
                </Button>
            
        </Card>
    );
}

export default withStyles(styles)(OrderSummary)