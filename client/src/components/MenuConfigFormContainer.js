import React, { Component } from 'react';
import MenuConfig from './MenuConfig';
import { connect } from "react-redux";

class MenuConfigFormContainer extends Component {

    render() {
        return <MenuConfig selection={this.props.selection} {...this.props} onSubmit={this.props.onSubmit} />
    }
}

const mapStateToProps = (state, props) => {
    return {
        form: "menuConfig" + props.selection,
    };
};

export default connect(mapStateToProps)(MenuConfigFormContainer);
