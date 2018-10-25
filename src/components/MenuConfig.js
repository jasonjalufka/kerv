import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import inventory from '../data/inventory';
import drinks from '../data/drinks';
import milkCost from "../data/milkCost";


let MenuConfig = (props) =>{
    return (
        <div>
            <Card>
                <Grid container spacing={24}>
                    {/* Display the drink options */}
                    <Grid item xs>
                        <List subheader={<ListSubheader component="div">Drinks</ListSubheader>}>
                            {
                                Object.keys(drinks).map((drink, index) => (
                                    <ListItem>
                                        <ListItemText primary={drink} secondary={'$' + drinks[drink].price} />
                                    </ ListItem>
                                ))
                            }
                        </List>
                    </Grid>

                    {/* Display bean options */}
                    <Grid item xs>
                        <List subheader={<ListSubheader component="div">Beans</ListSubheader>}>
                            {
                                Object.keys(inventory.beans).map((bean, index) => (
                                    <ListItem>
                                        <ListItemText primary={bean} />
                                    </ ListItem>
                                ))
                            }
                        </List>
                    </Grid>

                    {/* Display milk options */}
                    <Grid item xs>
                        <List subheader={<ListSubheader component="div">Milk</ListSubheader>}>
                            {
                                Object.keys(inventory.milk).map((milk, index) => (
                                    <ListItem>
                                        <ListItemText primary={milk} secondary={milkCost[milk] !== 0 ? '+ $' + milkCost[milk] : ''} />
                                    </ ListItem>
                                ))
                            }
                        </List>
                    </Grid>
                </Grid>
                <Grid item xs>
                    <Button variant="contained" color="primary">Edit</Button>
                    <Button variant="contained" color="primary">Add</Button>
                </Grid>
            </Card>
        </div>
    );
};

export default MenuConfig