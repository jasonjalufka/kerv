import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux'
import { List, IconButton, ListSubheader, Grid, ListItem, ListItemText, withStyles, Card} from '@material-ui/core/';
import { ChevronRight } from '@material-ui/icons';
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
        <Grid container alignItems="center" style={{marginRight:0}}>
        <Grid item xs={11}>
        <Card>
        <h3>Menu</h3>
            <Grid container spacing={0} >
                <Grid item xs={4} >  
                    <List subheader={<ListSubheader component="div">Drink</ListSubheader>}>
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
                </Grid>
                <Grid item xs={4} >
                    <List subheader={<ListSubheader component="div">Beans</ListSubheader>}>
                        {
                            Object.keys(props.kerv.bean).map((bean, index) => (
                                <ListItem  style={{paddingBottom: 31}} disabled={(hasDrinkOption? false : true)} className={classes.list} button selected={hasBeanOption === bean} key={index} onClick={() => {
                                    props.change("beanOption", bean);
                                }}>
                                    <Field style={{visibility: 'hidden' }} name="beanOption" component="input" type="radio" value={bean} />
                                    <ListItemText primary={bean} />
                                </ ListItem>
                            ))
                        }
                    </List>
                </Grid>
                                
                <Grid item xs={4} > 
                    <List subheader={<ListSubheader component="div">Milk</ListSubheader>}>
                        {
                            Object.keys(props.kerv.milk).map((milk, index) => (
                                <ListItem disabled={((hasBeanOption&&hasDrinkOption)&&(hasDrinkOption !== 'espresso') ? false : true)} className={classes.list} button selected={hasMilkOption === milk} key={index} onClick={() => {
                                    props.change("milkOption", milk);
                                }}>
                                    <Field style={{visibility: 'hidden' }} name="milkOption" component="input" type="radio" value={milk} />
                                    <ListItemText primary={milk} secondary={props.kerv.milk[milk].price ? ' $' + props.kerv.milk[milk].price.toFixed(2) : ''}></ListItemText>
                                </ ListItem>
                            ))
                        }
                    </List>
                </Grid> 
            </Grid>
        </Card>
        </Grid>
        <Grid item xs={1} >
            <IconButton type="submit"   disabled={!(((hasDrinkOption !== 'espresso') && hasBeanOption && hasMilkOption) || (hasDrinkOption === 'espresso' && hasBeanOption))}>
                <ChevronRight fontSize="large"/>
            </IconButton>
        </Grid>
        </Grid>
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