import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuItem from '../../components/MenuItem';

class Menu extends Component {
    render() {
        return (
            <MenuItem />
        );
    }
};

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);