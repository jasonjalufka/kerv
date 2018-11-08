import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from "react-router-dom";
import {Button, Card, TextField} from '@material-ui/core';

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
        <div>
            <Card>
                <form onSubmit={handleSubmit(submitForm)}>
                    <Field name="user" component={renderTextField} label="User"/>
                    <Field name="password" component={renderTextField} type="password" label="Password"/>
                    <Button type="submit" variant="contained" color="primary">Login</Button>
                </form>
            </Card>
        </div>
    );
};
    
LoginForm = reduxForm({
    form: 'login'
})(LoginForm)

export default LoginForm