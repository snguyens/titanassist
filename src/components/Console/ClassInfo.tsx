import React, { Component } from "react";
import { connect } from "react-redux";
import { getClassInfo } from "../../services";

interface Props {
    classNumber: number;
}

interface State {
    isLoading: boolean;
    enrollmentTotal?: string;
    combinedSectionCap?: string;
    waitListTotal?: string;
    waitListCap?: string;
    status?: string;
    classNumber?: string;
    units?: string;
    dates?: string;
    location?: string;
    notes?: string;
    description?: string;
}

//TODO: convert this to function component + use hooks
class ClassInfo extends Component<Props, State> {
    constructor(props: Props) {
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
        if (this.state.isLoading) {
            return <div className="loader" />;
        }

        return (
            <div>
                <div>
                    <div>
                        Enrolled:
                        {this.state.enrollmentTotal} /{" "}
                        {this.state.combinedSectionCap}
                    </div>
                    <div>
                        Waitlist:
                        {this.state.waitListTotal} / {this.state.waitListCap}
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

function mapStateToProps(state: any) {
    return {
        classNumber: state.console ? state.console.classNumber : null
    };
}

export default connect(
    mapStateToProps,
    null
)(ClassInfo);
