import React from 'react';
import { Field, reduxForm } from 'redux-form';
import DrinkOptions from '../components/DrinkOptions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

let MenuForm = props => {
    const { handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name="drink"
                component={DrinkOptions}
            />
            <button type="submit" label="submit">Submit</button>
        </form>
    );
};

//     return (
//         <Field name="drinkOptions" component={DrinkOptions} />

//     )
// };

MenuForm = reduxForm({
    // a unique name for the form
    form: 'menu'
})(MenuForm)

export default MenuForm