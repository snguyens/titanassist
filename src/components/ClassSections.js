import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

const defaultProps = {
    classSections: []
};

class ClassSections extends Component {
    renderStatus(status) {
        if (status === "OPEN") {
            return <span style={{ color: "green" }}>OPEN</span>;
        }
        if (status === "CLOSED") {
            return <span style={{ color: "red" }}>CLOSED</span>;
        }
        if (status === "WAITLIST") {
            return <span style={{ color: "orange" }}>WAITLIST</span>;
        }
    }

    render() {
        return (
            <div>
                {this.props.classSections.map(({ details, className }) => {
                    return (
                        <div>
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    textAlign: "left",
                                    textDecoration: "underline",
                                    backgroundColor: "#F1F5F6"
                                }}
                            >
                                {className}
                            </div>

                            <Table>
                                <thead>
                                    <tr style={{ fontSize: 12 }}>
                                        <th>Status</th>
                                        <th>Code</th>
                                        <th>Professor</th>
                                        <th>Room</th>
                                        <th>Section</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.map(
                                        ({
                                            status,
                                            code, // dates,
                                            professor,
                                            room,
                                            section,
                                            time
                                        }) => {
                                            return (
                                                <tr style={{ fontSize: 12 }}>
                                                    <td>
                                                        {this.renderStatus(
                                                            status
                                                        )}
                                                    </td>
                                                    <td>{code}</td>
                                                    {/* <td>{dates}</td> */}
                                                    <td>{professor}</td>
                                                    <td>{room}</td>
                                                    <td>{section}</td>
                                                    <td>{time}</td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    );
                })}
            </div>
        );
    }
}

ClassSections.defaultProps = defaultProps;

function mapStateToProps(state) {
    return {
        classSections: state.console ? state.console.classSections : []
    };
}

export default connect(
    mapStateToProps,
    null
)(ClassSections);
