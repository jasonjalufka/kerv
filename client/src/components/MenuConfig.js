import React from 'react';
import { FieldArray } from 'redux-form';
import { ListSubheader, List, ListItem, ListItemText, Button, Grid, IconButton} from '@material-ui/core';
import {Edit} from '@material-ui/icons/';
import {renderOriginalFields, renderNewFields} from './FieldRenderer';


// let handleChange = e => {
//     console.log("in handleChange");
//     return e.target.value;
// }

let MenuConfig = (props) => (
        <div>
            <Grid container spacing={8} justify='center'>
                <Grid item xs={4} >
                    { props.drinkEditMode &&
                        <FieldArray name='drink' component={renderOriginalFields} title="Drinks" type="menu"/>
                    }

                    { !props.drinkEditMode &&
                        <List subheader={<ListSubheader component="div">Drinks</ListSubheader>}>
                        <IconButton onClick={()=> {props.onEditMode('drink') }}><Edit fontSize="small"/></IconButton>
                        {
                            Object.keys(props.kerv.drink).map((drink, index) => ( 
                                <ListItem key={index}>
                                    <ListItemText primary={drink} secondary={props.kerv.drink[drink].price}/>
                                </ ListItem>                                                
                            ))
                        }
                        </List>
                    }
                    <FieldArray name="newDrinks" component={renderNewFields} saveOption={(mode) =>  props.onEditMode(mode) } type="drink"/>
                </Grid>
                <Grid item xs={4}>
                    { props.milkEditMode && 
                        <FieldArray name="milk" component={renderOriginalFields} title="Milk" type="menu" og={true}/>
                    }
                    { !props.milkEditMode &&
                        <List subheader={<ListSubheader component="div">Milk</ListSubheader>}>
                        <IconButton onClick={()=> {props.onEditMode('milk') }}><Edit fontSize="small"/></IconButton>
                        {
                            Object.keys(props.kerv.milk).map((milk, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={milk} secondary={props.kerv.milk[milk].price ? props.kerv.milk[milk].price : ''}/>
                                </ ListItem>
                            ))
                        }
                        </List>
                    }
                </Grid>
            </Grid>
            {(props.milkEditMode || props.drinkEditMode || props.newDrinkMode) &&<Button type="submit" color="primary">Save Changes</Button>}
            {(props.milkEditMode || props.drinkEditMode) &&<Button onClick={() => props.onEditMode()} color="primary">Cancel</Button>}
        </div>
    );                

export default MenuConfig;
