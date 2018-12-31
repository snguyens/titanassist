import React, { Component } from "react";
import Button from "react-bootstrap-button-loader";
import DropDown from "./DropDown";
import { subjectMap } from "../constants";

export default class Search extends Component {
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
