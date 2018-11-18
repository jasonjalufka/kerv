import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText} from '@material-ui/core';
import { ListSubheader, ListItemSecondaryAction, List, ListItem, ListItemText, Button, Grid, IconButton} from '@material-ui/core';
import { Delete, Clear} from '@material-ui/icons/';
import UserProfile from './UserProfile';

let Users = (props) => {
    return (
        <Grid item container xs>
            <Grid item xs={6}>
                <List subheader={<ListSubheader component={"div"}>Users</ListSubheader>}>
                    {props.userEditMode&&
                    <ListItem>
                        <ListItemSecondaryAction>
                                <IconButton aria-label="Cancel" color="secondary" onClick={()=> props.toggleView("user")}>
                                    <Clear fontSize="small"/>
                                </IconButton>
                            </ListItemSecondaryAction>
                    </ListItem>}
                { props.users.map((user,index) =>
                    <ListItem button selected={props.selectedUser === user} onClick={()=> props.handleSelectUser(user)} key={index}>
                        <ListItemText style={{textTransform: 'capitalize'}} primary={user.name}/>
                        {props.userEditMode&&
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => {props.toggleView('confirmDelete'); props.confirmDetails(user)}}aria-label="Delete">
                                <Delete fontSize="small"/>
                            </IconButton>
                        </ListItemSecondaryAction>}
                    </ListItem>
                )}    
                </List>
                <Dialog
                    open={props.confirmDelete}
                    onClose={() => props.toggleView('cancelDelete')}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Confirm User Removal"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        {props.user.name} : # {props.user.number}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.toggleView('cancelDelete')} color="primary">
                        Keep {props.user.name}
                        </Button>
                        <Button onClick={() =>props.removeUser()} color="primary" autoFocus>
                        Remove {props.user.name}
                        </Button>
                    </DialogActions>
                    </Dialog>
            </Grid>
             {!props.newUserForm&&
                <Grid item xs={6}><UserProfile user={props.selectedUser} /></Grid>
            }               
        </Grid>
    )
}
export default Users