import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import drinks from "../data/drinks";
import inventory from "../data/inventory";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


let MenuForm = (props) => {
    const { hasDrinkOption, hasBeanOption, hasMilkOption, handleSubmit } = props;

    const submitForm = (formValues) => {
        props.onSubmit(formValues);
        props.reset();
    }


    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div>
            <Grid container spacing={24}>
                <Grid item xs>
                    <Card>
                        <h3>Drink</h3>
                        {
                            Object.keys(drinks).map((drink, index) => (
                                <ListItem button selected={hasDrinkOption === drink} key={index} onClick={() => {
                                    props.change("drinkOption", drink);
                                }}>
                                    <Field name="drinkOption" component="input" type="radio" value={drink} />
                                    <ListItemText primary={drink} />
                                </ ListItem>
                            ))
                        }
                    </Card>
                </Grid>

                <Grid item xs>
                    {hasDrinkOption && <Card>
                        <h3>Beans</h3>
                        {
                            Object.keys(inventory.beans).map((bean, index) => (
                                <ListItem button selected={hasBeanOption === bean} key={index} onClick={() => {
                                    props.change("beanOption", bean);
                                }}>
                                    <Field name="beanOption" component="input" type="radio" value={bean} />
                                    <ListItemText primary={bean} />
                                </ ListItem>
                            ))
                        }
                    </Card>}
                </Grid>

                <Grid item xs>
                    {hasDrinkOption && hasBeanOption && <Card>
                        <h3>Milk</h3>
                        {
                            Object.keys(inventory.milk).map((milk, index) => (
                                <ListItem button selected={hasMilkOption === milk} key={index} onClick={() => {
                                    props.change("milkOption", milk);
                                }}>
                                    <Field name="milkOption" component="input" type="radio" value={milk} />
                                    <ListItemText primary={milk} />
                                </ ListItem>
                            ))
                        }
                    </Card>}
                </Grid>
            </Grid>
            </div>
            <Button type="submit" variant="contained" color="primary" disabled={!(hasDrinkOption && hasBeanOption && hasMilkOption)}>Add to Order</Button>
        </form>
    );
};

MenuForm = reduxForm({
    form: 'menu'
})(MenuForm)

const selector = formValueSelector('menu')
MenuForm = connect(
    state => {
        // can select values individually
        const drinkOption = selector(state, 'drinkOption')
        const beanOption = selector(state, "beanOption")
        const milkOption = selector(state, "milkOption")
        return {
            hasDrinkOption: drinkOption,
            hasBeanOption: beanOption,
            hasMilkOption: milkOption
        }
    }
)(MenuForm)

export default MenuForm

