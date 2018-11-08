import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from "react-router-dom";
import {Button, Card, TextField, Typography} from '@material-ui/core';

let LoginForm = (props) => {
    const { handleSubmit } = props;

    const submitForm = (formValues) => {
        props.onSubmit(formValues);
        props.reset();
    }

    const renderTextField = ({
        input,
        label,
        ...custom
      }) => <TextField label={label} type={input.type} {...input} {...custom}/>

      if(props.barista) return <Redirect to="/" />
      return (
            <Card  style={{width: "30%", margin: 'auto', marginTop: 50, paddingTop: 20, paddingBottom: 20}}>
                <Typography variant="h6" >Login to get started</Typography>
                <form  onSubmit={handleSubmit(submitForm)}>
                    <div><Field name="user" component={renderTextField} label="User"/></div>
                    <div><Field name="password" component={renderTextField} type="password" label="Password"/></div>
                    <div style={{paddingTop: 20}}><Button type="submit" variant="contained" color="primary">Login</Button></div>
                </form>
            </Card>
    );
};
    
LoginForm = reduxForm({
    form: 'login'
})(LoginForm)

export default LoginForm