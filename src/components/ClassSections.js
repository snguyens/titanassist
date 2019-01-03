import React, { Component } from "react";
import { connect } from "react-redux";
import { addClass } from "../actions";
import "./ClassSections.css";

const defaultProps = {
    classSections: []
};

class ClassSections extends Component {
    renderStatus(status) {
        if (status === "OPEN") {
            return (
                <span style={{ color: "green", fontWeight: "bold" }}>OPEN</span>
            );
        }
        if (status === "CLOSED") {
            return (
                <span style={{ color: "red", fontWeight: "bold" }}>CLOSED</span>
            );
        }
        if (status === "WAITLIST") {
            return (
                <span style={{ color: "orange", fontWeight: "bold" }}>
                    WAITL
                </span>
            );
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

                            <table
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
                                    {details.map(detail => {
                                        return (
                                            <tr
                                                className="classSection"
                                                style={{
                                                    fontSize: 12,
                                                    textAlign: "left"
                                                }}
                                                onClick={async () => {
                                                    await this.props.addClass({
                                                        ...detail,
                                                        className
                                                    });
                                                }}
                                            >
                                                <td>
                                                    {this.renderStatus(
                                                        detail.status
                                                    )}
                                                </td>
                                                <td>{detail.code}</td>
                                                {/* <td>{dates}</td> */}
                                                <td>{detail.professor}</td>
                                                <td>{detail.room}</td>
                                                <td>{detail.section}</td>
                                                <td>{detail.time}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
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

function mapDispatchToProps(dispatch) {
    return {
        addClass: details => dispatch(addClass(details))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassSections);
