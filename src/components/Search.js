import React, { Component } from "react";
import Button from "react-bootstrap-button-loader";
import DropDown from "./DropDown";
import { instance } from "../utils/apiConfig";
import { subjectMap } from "../constants";
import { connect } from "react-redux";
import { updateClassSections, updateDisplay, searchOnPress } from "../actions";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            subject: ""
        };
    }

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
                    disabled={this.state.isLoading}
                    style={{ marginTop: "50px" }}
                    onClick={() => {
                        this.setState({ isLoading: true }, async () => {
                            await this.props.searchOnPress({
                                subject: this.state.subject
                            });
                            this.setState({ isLoading: false });
                        });
                    }}
                >
                    Search
                </Button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateClassSections: classSections =>
            dispatch(updateClassSections(classSections)),
        updateDisplay: display => dispatch(updateDisplay(display)),
        searchOnPress: configs => dispatch(searchOnPress(configs))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Search);
