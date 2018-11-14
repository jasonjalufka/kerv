import React from 'react'
import {Card} from '@material-ui/core'

let UserProfile = (props) => (
    <Card>
        <h4>Temp Profile Template</h4>
        <h5>{props.user.name}</h5>
        <h6>{props.user.number}</h6>
    </Card>
    
);

export default UserProfile;