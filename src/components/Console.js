import React, { Component } from "react";
import Search from "./Search";
import ClassSections from "./ClassSections";
import { connect } from "react-redux";

class Console extends Component {
    renderSwitch() {
        switch (this.props.display) {
            case "SEARCH":
                return <Search />;
            case "CLASS_SECTIONS":
                return <ClassSections />;
            default:
                return <Search />;
        }
    }

    render() {
        return <div>{this.renderSwitch()}</div>;
    }
}

function mapStateToProps(state) {
    return {
        display: state.console ? state.console.display : ""
    };
}

export default connect(
    mapStateToProps,
    null
)(Console);
