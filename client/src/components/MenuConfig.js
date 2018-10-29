import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import inventory from '../data/inventory';
import drinks from '../data/drinks';
import milkCost from "../data/milkCost";
import { TextField, ListSubheader, List, ListItem, Button, Grid, Card} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const renderTextField = ({
    input,
    defaultValue,
    label,
}) => (
        <TextField
            defaultValue={defaultValue}
            onChange={input.onChange}
            label={label}
        />
    )

let handleChange = e => {
    console.log("in handleChange");
    return e.target.value;
}

const renderDrinkFields = ({fields}) => (
    <List subheader={<ListSubheader component="div">Additional</ListSubheader>}>
        {
            fields.map((drink, index) => (
                <ListItem>
                    {/* <Fields id={index} names={["drinkName"+index, 'drinkPrice'+index]} component={renderDrinkField}/> */}
                    {/* <FieldArray name={"newEntry" + index} component={renderDrinkInput} /> */}
                    <Field label="Drink Name" name={"name" + index} component={renderTextField}/>
                    <Field label="Drink Price" name={"price" + index} component={renderTextField}/>
                </ListItem>
            ))
        }
        <ListItem>
            <Button mini onClick={()=>{fields.push()}} variant="fab" color="primary" aria-label="Add">
                <AddIcon />
            </Button>
        </ListItem>
    </List>
)



let MenuConfig = (props) => {
    const { handleSubmit} = props;
    const submitForm = (formValues) => {
        props.onSubmit(formValues);
        console.log("in submitForm of MenuConfig");
        console.log(formValues);
        props.reset();
    }
    
    return (
            <Card>
                <form onSubmit={handleSubmit(submitForm)}>
                    <Grid container spacing={24}>
                        <Grid item xs>
                            <List subheader={<ListSubheader component="div">Drinks</ListSubheader>}>
                                {
                                    Object.keys(drinks).map((drink, index) => ( 
                                        <ListItem>
                                            <Field name={drink} onChange={handleChange} defaultValue={drink} component={renderTextField} />
                                            <Field name={drink + "Price"} onChange={handleChange} defaultValue={drinks[drink].price} component={renderTextField} />
                                        </ ListItem>                                                
                                    ))
                                }
                                {/* <Button mini onClick={addNewField} variant="fab" color="primary" aria-label="Add">
                                    <AddIcon />
                                </Button> */}
                            </List>
                            <FieldArray name={"newDrinks"} component={renderDrinkFields}/>
                        </Grid>
                        <Grid item xs>
                            <List subheader={<ListSubheader component="div">Milk</ListSubheader>}>
                                {
                                    Object.keys(inventory.milk).map((milk, index) => (
                                        <ListItem>
                                            <Field name={milk} onChange={handleChange} defaultValue={milk} component={renderTextField} />
                                            <Field name={milk + "Price"} onChange={handleChange} defaultValue={milkCost[milk] !== 0 ? milkCost[milk] : ''} component={renderTextField}/>
                                        </ ListItem>
                                    ))
                                }
                            </List>
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </form>       
            </Card>
    );
                 
};

MenuConfig = reduxForm({
    form: 'menuConfig'
})(MenuConfig)

export default MenuConfig