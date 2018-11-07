import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

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