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
            return <span style={{ color: "orange" }}>WAITL</span>;
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
                                    fontSize: 15,
                                    textAlign: "center",
                                    backgroundColor: "#00376B",
                                    color: "white",
                                    padding: "10px"
                                }}
                            >
                                {className}
                            </div>

                            <Table
                                className="table is-bordered is-hoverable"
                                bordered
                                hover
                                style={{
                                    marginBottom: 0,
                                    width: "100%"
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            fontSize: 12,
                                            backgroundColor: "#D3D3D3",
                                            textAlign: "center"
                                        }}
                                    >
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
                                                <tr
                                                    style={{
                                                        fontSize: 12,
                                                        textAlign: "left"
                                                    }}
                                                >
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
