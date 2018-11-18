import React from 'react';
import { reduxForm, Field } from 'redux-form';
import  { renderTextField } from './FieldRenderer';
import { Button } from '@material-ui/core';

let NewUser = (props) => {
    const { handleSubmit } = props
    
    let submit = (formValues) => {
        props.onSubmit(formValues);
        props.reset();
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <div><Field variant="outlined" required={true} name="name" label="Name" component={renderTextField}></Field></div>
            <div><Field variant="outlined" required={true} name="number" label="Number" component={renderTextField}></Field></div>
            <div><Button type="submit" color="primary">Save</Button></div>
        </form>
    )
}

NewUser = reduxForm({
    form: 'newUser'
})(NewUser)

export default NewUser;