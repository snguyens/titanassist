import React, { Component } from "react";
import Button from "react-bootstrap-button-loader";
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

    handleChange = event => {
        this.setState({ subject: event.target.value });
    };

    render() {
        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Term</div>

                        <div style={{ flex: 3 }}>
                            Summer 2018
                            {/* <DropDown items={[{ name: "Summer 2018" }]} /> */}
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Subject</div>

                        <div style={{ flex: 3 }}>
                            <select
                                value={this.state.subject}
                                onChange={this.handleChange}
                            >
                                <option />
                                {Object.keys(subjectMap).map(subject => {
                                    return (
                                        <option value={subject}>
                                            {subjectMap[subject]}
                                        </option>
                                    );
                                })}
                                <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                            </select>
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
