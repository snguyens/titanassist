import React, { Component } from "react";
import Button from "react-bootstrap-button-loader";
import DropDown from "./DropDown";
import { subjectMap } from "../constants/subjects";
import { connect } from "react-redux";
import { searchForClasses } from "../actions";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            subject: ""
        };
    }

    searchForClasses = async () => {
        this.setState({ isLoading: true });
        await this.props.searchForClasses({
            subject: this.state.subject
        });
        this.setState({ isLoading: false });
    };

    render() {
        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Term</div>

                        <div style={{ flex: 3 }}>
                            <DropDown items={[{ name: "Summer 2018" }]} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Subject</div>

                        <div style={{ flex: 3 }}>
                            <DropDown
                                value={subjectMap[this.state.subject]}
                                items={Object.keys(subjectMap).map(subject => {
                                    return {
                                        displayName: subjectMap[subject],
                                        value: subject
                                    };
                                })}
                                onClick={value => {
                                    this.setState({
                                        subject: value
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    bsStyle="primary"
                    loading={this.state.isLoading}
                    style={{ marginTop: "50px" }}
                    onClick={this.searchForClasses}
                >
                    Search
                </Button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchForClasses: configs => dispatch(searchForClasses(configs))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Search);
