import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux'
import {List, ListSubheader, Card, Grid, ListItem, ListItemText, withStyles, Button} from '@material-ui/core/';

const styles = theme => ({
    textRight: {
        textAlign: 'right',
    },
    textLeft: {
        textAlign: 'left',
        paddingLeft: 0,
        marginLeft: 0

    },
    list: {
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: 'left',
        textAlign: 'left',
    }
});

let MenuForm = (props) => {
    const { classes, hasDrinkOption, hasBeanOption, hasMilkOption, handleSubmit } = props;

    const submitForm = (formValues) => {
        props.onSubmit(formValues);
        props.reset();
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Grid container spacing={4}>
                <Grid item xs={4} >  
                    <Card style={{ height: '400px' }}>
                        <List subheader={<ListSubheader component="div">Drink</ListSubheader>}>
                            <List >
                            {
                                Object.keys(props.kerv.drink).map((drink, index) => (
                                    <ListItem button selected={hasDrinkOption === drink} key={index} onClick={() => {
                                        props.change("drinkOption", drink);
                                        props.change("milkOption", null);
                                    }}>
                                        <Field style={{visibility: 'hidden' }} name="drinkOption" component="input" type="radio" value={drink} />
                                        <ListItemText primary={drink} secondary={'$' + props.kerv.drink[drink].price} />
                                    </ ListItem>
                                ))
                            }
                            </List>
                        </List>
                    </Card>
                </Grid>
                <Grid item xs={4} >
                    <Card  style={{ height: '400px' }}>
                        <List subheader={<ListSubheader component="div">Beans</ListSubheader>}>
                            {
                                Object.keys(props.kerv.bean).map((bean, index) => (
                                    <ListItem disabled={(hasDrinkOption? false : true)} className={classes.list} button selected={hasBeanOption === bean} key={index} onClick={() => {
                                        props.change("beanOption", bean);
                                    }}>
                                        <Field style={{visibility: 'hidden' }} name="beanOption" component="input" type="radio" value={bean} />
                                        <ListItemText className={classes.textLeft} primary={bean} />
                                    </ ListItem>
                                ))
                            }
                        </List>
                    </Card>
                </Grid>
                                
                <Grid item xs={4} > 
                    <Card  style={{ height: '400px'}}>
                        <List subheader={<ListSubheader component="div">Milk</ListSubheader>}>
                            {
                                Object.keys(props.kerv.milk).map((milk, index) => (
                                    <ListItem disabled={((hasBeanOption&&hasDrinkOption)&&(hasDrinkOption !== 'espresso') ? false : true)} className={classes.list} button selected={hasMilkOption === milk} key={index} onClick={() => {
                                        props.change("milkOption", milk);
                                    }}>
                                        <Field style={{visibility: 'hidden' }} name="milkOption" component="input" type="radio" value={milk} />
                                        <ListItemText className={classes.textLeft} primary={milk} />
                                        <ListItemText className={classes.textRight}primary={props.kerv.milk[milk].price ? ' $' + props.kerv.milk[milk].price.toFixed(2) : ''}></ListItemText>
                                    </ ListItem>
                                ))
                            }
                        </List>
                    </Card>
                </Grid> 
            </Grid>
            <Button type="submit" variant="contained" color="primary" disabled={!(((hasDrinkOption !== 'espresso') && hasBeanOption && hasMilkOption) || (hasDrinkOption === 'espresso' && hasBeanOption))}>Add to Order</Button>
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
            hasMilkOption: milkOption,
        }
    }
)(MenuForm)

export default withStyles(styles)(MenuForm)