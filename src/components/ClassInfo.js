import React, { Component } from "react";
import { connect } from "react-redux";
import { getClassInfo } from "../services";

class ClassInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }
    async componentDidMount() {
        const classInfo = await getClassInfo(this.props.classNumber);
        this.setState({ ...classInfo, isLoading: false });
    }
    render() {
        return (
            <div>
                {this.state.isLoading ? (
                    <div className="loader" />
                ) : (
                    <div>
                        <div>
                            Enrolled:
                            {this.state.enrollmentTotal} /{" "}
                            {this.state.combinedSectionCap}
                        </div>
                        <div>
                            Waitlist:
                            {this.state.waitListTotal} /{" "}
                            {this.state.waitListCap}
                        </div>
                        <div>Status: {this.state.status}</div>
                        <div>Class Number: {this.state.classNumber}</div>
                        <div>Units: {this.state.units}</div>
                        <div>Dates: {this.state.dates}</div>
                        <div>Location: {this.state.location}</div>
                        <div>Notes: {this.state.notes}</div>
                        <div>Description: {this.state.description}</div>
                    </div>
                )}
            </div>
        );
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
