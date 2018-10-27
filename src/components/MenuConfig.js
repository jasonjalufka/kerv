import React from 'react';
import { Field, reduxForm} from 'redux-form';
// import { connect } from 'react-redux'
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
import { TextField } from '@material-ui/core';

const renderTextField = ({
    input,
    defaultValue,
  }) => (
    <TextField
    defaultValue={defaultValue}
    onChange={input.onChange}
    />
  )

  let handleChange = e => {
      console.log("in handleChange");
      return e.target.value;
  }

let MenuConfig = props => {
    const {handleSubmit} = props;
    const submitForm = (formValues) => {
        props.onSubmit(formValues);
        console.log("in submitForm of MenuConfig");
        console.log(formValues);
        props.reset();
    }
    return (
        <div>
            <Card>
                <Grid container spacing={24}>
                    {/* Display the drink options */}
                    {props.selection === "drink" ?
                    <Grid item xs>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <List subheader={<ListSubheader component="div">Drinks</ListSubheader>}>
                            {
                                Object.keys(drinks).map((drink, index) => (
                                    <Grid container space={8} key={index}>
                                        <Grid item xs>
                                            <ListItem>
                                                <Field name={drink} onChange={handleChange} defaultValue={drink} component={renderTextField}/>
                                                <Field name={drink + "Price"} onChange={handleChange} defaultValue={drinks[drink].price} component={renderTextField} />

                                                {/* <ListItemText primary={drink} /> */}
                                            </ ListItem>
                                        </Grid>
                                        <Grid item xs>
                                            <ListItem>
                                                {/* <Field label="$" name={drink + "Price"} placeholder={drinks[drink].price} component="input" type="text" value={""+drinks[drink].price} /> */}
                                                {/* <ListItemText primary={'$' + drinks[drink].price} /> */}
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                        </List>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </form>
                    </Grid>
                    : ''
                    }
                    

                    {/* Display bean options */}
                    {props.selection === "bean" ?
                    <Grid item xs>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <List subheader={<ListSubheader component="div">Beans</ListSubheader>}>
                                {
                                    Object.keys(inventory.beans).map((bean, index) => (
                                        <ListItem>
                                            <ListItemText primary={bean} />
                                        </ ListItem>
                                    ))
                                }
                            </List>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </form>
                    </Grid>
                    : ''
                    }

                    {/* Display milk options */}
                    {props.selection === "milk" ?
                    <Grid item xs>
                        <form onSubmit={handleSubmit(submitForm)}>
                            <List subheader={<ListSubheader component="div">Milk</ListSubheader>}>
                                {
                                    Object.keys(inventory.milk).map((milk, index) => (
                                        <ListItem>
                                            <ListItemText primary={milk} secondary={milkCost[milk] !== 0 ? '+ $' + milkCost[milk] : ''} />
                                        </ ListItem>
                                    ))
                                }
                            </List>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </form>
                    </Grid>
                    : ''
                    }
                </Grid>
                {/* <Grid item xs>
                    <Button variant="contained" color="primary">Edit</Button>
                    <Button variant="contained" color="primary">Add</Button>
                </Grid> */}
            </Card>
        </div>
    );
};

MenuConfig = reduxForm({
    
})(MenuConfig)

export default MenuConfig