import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

const defaultProps = {
    classSections: []
};

class ClassSections extends Component {
    render() {
        return (
            <div>
                {this.props.classSections.map(({ details, className }) => {
                    return (
                        <div>
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    textAlign: "left",
                                    textDecoration: "underline"
                                }}
                            >
                                {className}
                            </div>

                            <Table>
                                <thead>
                                    <tr>
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
                                            code,
                                            dates,
                                            professor,
                                            room,
                                            section,
                                            time
                                        }) => {
                                            return (
                                                <tr>
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
