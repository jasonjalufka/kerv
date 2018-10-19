import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

import Inventory from '../../components/Inventory';
import Menu from '../../containers/Menu/Menu';
import OrderControls from '../../components/OrderControls';

class Kerv extends Component {
    render() {
        return (
            <div>
                <Menu />
                <Inventory />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Kerv);
