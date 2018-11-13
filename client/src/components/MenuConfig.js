import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { TextField, ListSubheader, List, ListItem, ListItemText, Button, Grid, Card, IconButton} from '@material-ui/core';
import {Edit, Add} from '@material-ui/icons/';
import { connect } from 'react-redux'

const renderTextField = ({
    input,
    label
}) => (
    <TextField
        value={input.value}
        onChange={input.onChange}
        label={label}
    />)

// let handleChange = e => {
//     console.log("in handleChange");
//     return e.target.value;
// }

const renderNewDrinkFields = ({fields, saveOption}) => (
    <List subheader={<ListSubheader component="div">Additional</ListSubheader>}>
    {
        fields.map((drink, index) => (
            <ListItem key={index}>
                <Field label="Name" name={`${drink}.name`} component={renderTextField}/>
                <Field label="Price" name={`${drink}.price`} component={renderTextField}/>
                <Field label="Milk Required" name={`${drink}.milkReq`} component={renderTextField}/>
            </ListItem>
        ))
    }
        <ListItem>
            <IconButton mini="true" onClick={()=>{fields.push(); saveOption('newDrink')}} variant="fab" color="primary" aria-label="Add">
                <Add fontSize="small" />
            </IconButton>
        </ListItem>
    </List>
)

const renderOriginalFields = ({fields, title}) => (
    <List subheader={<ListSubheader component="div">{title}</ListSubheader>}>
    {
        fields.map((type, index) => (
            <ListItem key={index}>
                    <Field name={`${type}.name`}  component={renderTextField}/>
                    <Field name={`${type}.price`} component={renderTextField} />
            </ListItem>  
        ))
    }
    </List>

)
let getInitialFormData = (kerv) => {
    let data = {
        drink: [],
        milk: []
    }
    console.log('this is kerv in getInitialFormData: ', kerv);

    Object.keys(kerv).map(type => {
        type !== 'bean' && type!== 'barista'?
        Object.keys(kerv[type]).map(key => {
            let price = 0
            key === 'whole' ?
                price = 0 : price=kerv[type][key].price
            data[type].push({'name': key, 'price': price})
            return null;
        })
        : console.log('noinot')
        return null;
    })
    return data;
}
let MenuConfig = (props) => {
    const { handleSubmit} = props;
    const submitForm = (formValues) => {
        props.onSubmit(formValues, getInitialFormData(props.kerv));
    }
    
    return (
        <Card>
            <form onSubmit={handleSubmit(submitForm)}>
                <Grid container spacing={24}>
                    <Grid item xs>
                        { props.drinkEditMode &&
                            <FieldArray name='drink' component={renderOriginalFields} title="Drinks"/>
                        }

                        { !props.drinkEditMode &&
                            <List subheader={<ListSubheader component="div">Drinks</ListSubheader>}>
                            <IconButton onClick={()=> {props.onLoadFormData(getInitialFormData(props.kerv));props.onEditMode('drink') }}><Edit fontSize="small"/></IconButton>
                            {
                                Object.keys(props.kerv.drink).map((drink, index) => ( 
                                    <ListItem key={index}>
                                        <ListItemText primary={drink} secondary={props.kerv.drink[drink].price}/>
                                    </ ListItem>                                                
                                ))
                            }
                            </List>
                        }
                        <FieldArray name="newDrinks" component={renderNewDrinkFields} saveOption={(mode) =>  props.onEditMode(mode) } />

                    </Grid>
                    <Grid item xs>
                        { props.milkEditMode && 
                            <FieldArray name="milk" component={renderOriginalFields} title="Milk"/>
                        }
                        { !props.milkEditMode &&
                            <List subheader={<ListSubheader component="div">Milk</ListSubheader>}>
                            <IconButton onClick={()=> {props.onLoadFormData(getInitialFormData(props.kerv));props.onEditMode('milk') }}><Edit fontSize="small"/></IconButton>
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

            </form>       
        </Card>
    );
                 
};

MenuConfig = reduxForm({
    form: 'menuConfig'
})(MenuConfig)

const mapStateToProps = state => {
    return {
      initialValues: state.config.data,
      kerv : state.kerv
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        onLoadFormData: (data) => {
            dispatch({ type: 'LOAD', data: data });
          }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuConfig);
