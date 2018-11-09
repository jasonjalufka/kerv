import React from 'react';
import {List, ListSubheader, Card, Divider, withStyles, ListItem, ListItemText, Button} from '@material-ui/core/';
import { Remove } from '@material-ui/icons';
import { IconButton, CircularProgress, Fade }from '@material-ui/core/';

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

const Orders = props => {
    const { classes, order, addTip, hasTip } = props
    return (
        <Card style={{ position: 'relative', height: '100%' }}>
            <h3>Current Order</h3>
            {/* <CircularProgress
                variant="determinate"
                value={props.completed}
                /> */}
                { props.orderPlaced && 
                    <CircularProgress variant="determinate" value={props.completed}/>
                }
                <Fade in={props.confirmation} ><div>Order was submitted!</div></Fade>
            {order[0]&&<List>
            {
                Object.keys(order).filter(element => !isNaN(parseInt(element))? element : '').map((orderKey, index) => (
                    <div key={index} onMouseEnter={() => props.handleHover(index)} onMouseLeave={() => props.handleHover(index)}>
                        <ListItem >
                            <ListItemText className={classes.textLeft} primary={order[orderKey].drinkOption} 
                                secondary={( order[orderKey].milkOption !== 'whole' && order[orderKey].drinkOption !== 'espresso') ? '+ $' + props.milk[order[orderKey].milkOption].price + ' ' + order[orderKey].milkOption  : ''} />
                            <ListItemText className={classes.textRight}primary={'$' + order[orderKey].total} />
                            {props.hovering && index === props.hoverOver ? <IconButton onClick={() => props.remove(orderKey)}><Remove fontSize="small" color="secondary"/></IconButton> : ''}
                        </ListItem>
                    </div>
                ))
            }
            </List>}
            
            <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <List>
                    <ListItem>
                        <ListItemText className={classes.textLeft} primary={'Tip'} />
                        <ListItemText className={classes.textRight} primary={'$'+ hasTip}/>
                    </ListItem>
                    <Divider />
                </List>
                <List subheader={<ListSubheader component="div">Tip</ListSubheader>} style={{display: 'flex',flexDirection: 'row'}}>
                    <ListItem disabled={props.order[0]? false: true} button onClick={() => addTip(0)}selected={hasTip === 0}><ListItemText className={classes.textLeft} primary={'$0'} /></ListItem>
                    <ListItem disabled={props.order[0]? false: true} button onClick={() => addTip(1)}selected={hasTip === 1}><ListItemText className={classes.textLeft} primary={"$1"} /></ListItem>
                    <ListItem disabled={props.order[0]? false: true} button onClick={()=> addTip(2)} selected={hasTip === 2}><ListItemText className={classes.textLeft} primary={"$2"} /></ListItem>
                </List>
                <Button disabled={props.order[0]? false: true}className={classes.button}variant="contained"
                    color="primary"
                    onClick={() => props.placeOrder(order, hasTip)}>Charge ${props.order.orderTotal + hasTip}
                </Button>
            </div>
        </Card>
    );
}

export default withStyles(styles)(Orders)