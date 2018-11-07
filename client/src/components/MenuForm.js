import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {List, ListSubheader} from '@material-ui/core/';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

let getModalStyle = () => {
    const top = 25;
    const left = 50;

    return {
    top: `${top}%`,
    left: `${left}%`,
    marginLeft: '-25%'
    };
}
const styles = theme => ({
    paper: {
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
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
    },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  }
});

let MenuForm = (props) => {
    const { classes, openModal, onCloseModal, onOpenModal, hasDrinkOption, hasBeanOption, hasMilkOption, handleSubmit } = props;

    const submitForm = (formValues) => {
        props.onSubmit(formValues);
        props.reset();
    }

    return (
            <div>
                <Card style={{height: 400, overflow: 'auto'}}>  
                    <List subheader={<ListSubheader component="div">Drink</ListSubheader>}>
                        {
                            Object.keys(props.kerv.drink).map((drink, index) => (
                                <ListItem button selected={hasDrinkOption === drink} key={index} onClick={() => {
                                    onOpenModal()
                                    props.change("drinkOption", drink);
                                    props.change("milkOption", null);
                                }}>
                                    <Field style={{visibility: 'hidden' }} name="drinkOption" component="input" type="radio" value={drink} />
                                    <ListItemText primary={drink} secondary={'$' + props.kerv.drink[drink].price} />
                                </ ListItem>
                            ))
                        }
                    </List>
                </Card>
                <Modal style={{alignItems:'center',justifyContent:'center'}} open={openModal} onClose={onCloseModal}>
                    <form onSubmit={handleSubmit(submitForm)}>
                        <Card style={getModalStyle()}  className={classes.paper}>
                        <Typography variant="h6" className={classes.title}>{hasDrinkOption}</Typography>  
                                {hasDrinkOption &&
                                    <List subheader={<ListSubheader component="div">Beans</ListSubheader>}>
                                    <List style={{display: 'flex',flexDirection: 'row'}}>
                                        {
                                            Object.keys(props.kerv.bean).map((bean, index) => (
                                                <ListItem className={classes.list} button selected={hasBeanOption === bean} key={index} onClick={() => {
                                                    props.change("beanOption", bean);
                                                }}>
                                                    <Field style={{visibility: 'hidden' }} name="beanOption" component="input" type="radio" value={bean} />
                                                    <ListItemText className={classes.textLeft} primary={bean} />
                                                </ ListItem>
                                            ))
                                        }
                                    </List></List>
                                }
                             {(hasDrinkOption !== 'espresso') && hasBeanOption && 
                             <List subheader={<ListSubheader component="div">Milk</ListSubheader>}>
                                    <List style={{display: 'flex',flexDirection: 'row'}}>
                                    {
                                        Object.keys(props.kerv.milk).map((milk, index) => (
                                            <ListItem className={classes.list} button selected={hasMilkOption === milk} key={index} onClick={() => {
                                                props.change("milkOption", milk);
                                            }}>
                                                <Field style={{visibility: 'hidden' }} name="milkOption" component="input" type="radio" value={milk} />
                                                <ListItemText className={classes.textLeft} primary={milk} />
                                                <ListItemText className={classes.textRight}primary={props.kerv.milk[milk].price ? ' $' + props.kerv.milk[milk].price.toFixed(2) : ''}></ListItemText>
                                                

                                            </ ListItem>
                                        ))
                                    }
                                </List></List>
                             }
                        <Button type="submit" variant="contained" color="primary" disabled={!(((hasDrinkOption !== 'espresso') && hasBeanOption && hasMilkOption) || (hasDrinkOption === 'espresso' && hasBeanOption))}>Add to Order</Button>
                    </Card>
                </form>
            </Modal>
        </div>
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