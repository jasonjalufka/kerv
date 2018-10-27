import React from 'react';
import { reduxForm } from 'redux-form';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import inventory from '../data/inventory';
import Grid from '@material-ui/core/Grid';

let InventoryConfig = (props) => {
	const { handleSubmit } = props;
	const submitForm = (formValues) => {
		props.onSubmit(formValues);
		console.log("in submitForm of InventoryConfig");
		props.reset();
	}
	return (
		<Card>
			<form onSubmit={handleSubmit(submitForm)}>
				<Grid container spacing={24}>
					<Grid item xs>
						<List subheader={<ListSubheader component="div">Bean Inventory</ListSubheader>}>
							{
								Object.keys(inventory.beans).map((bean, index) => (
									<ListItem button>
										<ListItemText primary={bean} />
									</ListItem>
								))
							}
						</List>
					</Grid>
					<Grid item xs>
						<List subheader={<ListSubheader component="div">Milk Inventory</ListSubheader>}>
							{
								Object.keys(inventory.milk).map((milk, index) => (
									<ListItem button>
										<ListItemText primary={milk} />
									</ListItem>
								))
							}
						</List>
					</Grid>
				</Grid>
			</form>
		</Card>
	);
}

InventoryConfig = reduxForm({
	form: 'inventoryConfig'
})(InventoryConfig)

export default InventoryConfig;