import React from 'react';
import List from '@material-ui/core/List';
import { Field, FieldArray } from 'redux-form';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {Grid, IconButton, Button} from '@material-ui/core';
import {Edit, Add, Remove} from '@material-ui/icons/';
import {renderNewFields, renderOriginalFields} from './FieldRenderer';


let InventoryConfig = (props) => (
	<Grid container justify='center'>
		<Grid item container direction="column" style={{width: '60%'}} >
			<Grid item container spacing={8} justify='center'>
				<Grid item xs={6}>
					{ props.beanEditMode && 
						<FieldArray name='bean' component={renderOriginalFields} title="Beans" type="inventory"/>
					}
					{ !props.beanEditMode &&
						<List subheader={<ListSubheader component="div">Bean Inventory</ListSubheader>}>
							<IconButton onClick={()=> {props.onEditMode('bean') }}><Edit fontSize="small"/></IconButton>
							{
								Object.keys(props.kerv.bean).map((bean, index) => (
									<ListItem button>
										<ListItemText primary={bean} />
									</ListItem>
								))
							}
						</List>
					}
				</Grid>
				<Grid item xs={6}>
					{ props.milkInvEditMode &&
						<FieldArray name='milk' component={renderOriginalFields} title="Milk" type="inventory"/>
					}
					{ !props.milkInvEditMode &&
						<List subheader={<ListSubheader component="div">Milk Inventory</ListSubheader>}>
						<IconButton onClick={()=> {props.onEditMode('milkInv') }}><Edit fontSize="small"/></IconButton>
							{
								Object.keys(props.kerv.milk).map((milk, index) => (
									<ListItem button>
										<ListItemText primary={milk} />
									</ListItem>
								))
							}
						</List>
					}
				</Grid>
			</Grid>
			<Grid item direction="column" container justify='center'> 
				<Grid item><FieldArray name='newInvItems' component={renderNewFields} saveOption={(mode) => props.onEditMode(mode)} type="inventory"/></Grid>
				<Grid item>{(props.milkInvEditMode || props.beanEditMode || props.newInvMode) &&<Button type="submit" color="primary">Save Changes</Button>}
					{(props.milkInvEditMode || props.beanEditMode) &&<Button onClick={() => props.onEditMode()} color="primary">Cancel</Button>}
				</Grid>
			</Grid>
		</Grid>
	</Grid>
);
			
export default InventoryConfig;