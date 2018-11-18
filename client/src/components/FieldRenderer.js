import React from 'react';
import { Field } from 'redux-form';
import { TextField, ListSubheader, List, ListItem, IconButton} from '@material-ui/core';
import { Add, Remove} from '@material-ui/icons/';


export const renderNewFields = ({fields, saveOption, type}) => {
    let saveType = ""
    type==='drink'?
        saveType = 'newDrink'
    : type === 'inventory'?
        saveType = 'newInvItem'
    : console.log('Incorrect Save Option: ')

    return ( 
        <List subheader={<ListSubheader component="div">Additional</ListSubheader>}>
        {
            fields.map((item, index) => (
                <ListItem key={index}>
                    { type==='drink'?
                        <div>
                            { getDrinkFields(item) }
                            <Field  name={`${item}.milkReq`} component={renderTextField}/>
                        </div>
                    : type==='inventory'?
                            <div >
                                { getInvFields(item) }
                                <Field name={`${item}.type`} component={renderTextField}/>
                            </div>
                    : console.log('Incorrect type provided')
                    }
                    <IconButton onClick={() => fields.remove(index)}><Remove fontSize="small"/></IconButton>
                </ListItem>
            ))
        }
            <ListItem>
                <IconButton mini="true" onClick={()=>{fields.push(); saveOption(saveType)}} variant="fab" color="primary" aria-label="Add">
                    <Add fontSize="small" />
                </IconButton>
            </ListItem>
        </List>
    );
}
const getDrinkFields = (item, og) => (
    <div style={{display: 'inline-block'}}>
        { og ?
            <Field disabled={true}  name={`${item}.name`} component={renderTextField}/>
            : <Field disabled={false} name={`${item}.name`} component={renderTextField}/>
        }
        <Field  name={`${item}.price`} component={renderTextField}/>
    </div>
)
const getInvFields = (item, og) => (
    <div style={{display: 'inline-block'}}>
        <Field name={`${item}.name`} component={renderTextField}/>
        <Field name={`${item}.amount`} component={renderTextField}/>
    </div>
)

export const renderOriginalFields = ({fields, title, type, og}) => (
    <List subheader={<ListSubheader component="div">{title}</ListSubheader>}>
    {
        fields.map((item, index) => (
            <ListItem key={index}>
                { type==='menu'?
                    getDrinkFields(item, og)
                  : type ==='inventory'?
                    getInvFields(item, og)
                  : console.log('Incorrect type provided: ')
                }
            </ListItem>  
        ))
    }
    </List>
);

export const renderTextField = ({
    input,
    label,
    disabled,
    required
}) => (
    <TextField
        value={input.value}
        variant={input.variant}
        required={required}
        onChange={input.onChange}
        label={label}
        disabled={disabled}
    />);