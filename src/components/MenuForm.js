import React from 'react';
import { Field, reduxForm, formValueSelector} from 'redux-form';
import DrinkOptions from '../components/DrinkOptions';
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import drinks from "../data/drinks";
import inventory from "../data/inventory";
import Card from '@material-ui/core/Card';

 let MenuForm = (props) => {
    const {hasDrinkOption, hasBeanOption, hasMilkOption, handleSubmit} = props;
    //props.initialize({drinkOption: "espresso"});
    const submitForm = (formValues) => {
        console.log('submitting Form: ', formValues);
        props.onSubmit(formValues);
        props.reset();
      }
      
    
    return (
        <form onSubmit={handleSubmit(submitForm)}>
        <Card>
            { 
                Object.keys(drinks).map((drink, index) => (
                    <ListItem button selected={hasDrinkOption === drink} key={index} onClick={() =>  { 
                        props.change("drinkOption", drink);
                    }}>
                    <Field name="drinkOption" component="input" type="radio" value={drink}/> 
                    <ListItemText primary={drink} />
                </ ListItem>
                ))
            }
        </Card>

            {hasDrinkOption && <Card>
                <h2>Beans</h2>
            { 
                Object.keys(inventory.beans).map((bean, index) => (
                    <ListItem button selected={hasBeanOption === bean} key={index} onClick={() =>  { 
                        props.change("beanOption", bean);
                    }}>
                    <Field name="beanOption" component="input" type="radio" value={bean}/> 
                    <ListItemText primary={bean} />
                </ ListItem>
                ))
            }
           </Card>}

           {hasDrinkOption &&hasBeanOption && <Card>
                <h2>Milk</h2>
            { 
                Object.keys(inventory.milk).map((milk, index) => (
                    <ListItem button selected={hasMilkOption === milk} key={index} onClick={() =>  { 
                        props.change("milkOption", milk);
                    }}>
                    <Field name="milkOption" component="input" type="radio" value={milk}/> 
                    <ListItemText primary={milk} />
                </ ListItem>
                ))
            }
           </Card>}
            <button type="submit" label="submit" >{hasDrinkOption ? hasDrinkOption : "null"}</button>
        </form>
    );
};

//     return (
//         <Field name="drinkOptions" component={DrinkOptions} />

//     )
// };

MenuForm = reduxForm({
    form: 'menu'  
  })(MenuForm)

const selector = formValueSelector('menu') 
MenuForm = connect(
  state => {
    // can select values individually
    const drinkOption = selector(state, 'drinkOption')
    const beanOption = selector(state, "beanOption" )
    const milkOption = selector(state, "milkOption")
    return {
      hasDrinkOption : drinkOption,
      hasBeanOption : beanOption,
      hasMilkOption: milkOption
    }
  }
)(MenuForm)

export default MenuForm

