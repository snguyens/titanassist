import React, { Component } from "react";
import { connect } from "react-redux";
import { getClassInfo } from "../services";

class ClassInfo extends Component {
    async componentDidMount() {
        const classInfo = await getClassInfo(this.props.classNumber);
        console.log(classInfo);
    }
    render() {
        return <div />;
    }
}

function mapStateToProps(state) {
    return {
        classNumber: state.console ? state.console.classNumber : null
    };
}

export default connect(
    mapStateToProps,
    null
)(ClassInfo);
