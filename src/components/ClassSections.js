import React, { Component } from "react";
import { connect } from "react-redux";
import { addClass, updateDisplay } from "../actions";
import { SEARCH } from "../constants/display";
import { getClassInfo } from "../services";
import "./ClassSections.css";

class ClassSections extends Component {
    static defaultProps = {
        classSections: []
    };

    navigateBack = async () => {
        await this.props.updateDisplay(SEARCH);
    };

    addClassToCalendar = async (detail, className) => {
        if (detail.time === "TBA") {
            window.alert(`Class ${detail.code} currently has no time!`);
        }
        await this.props.addClass({
            ...detail,
            className
        });
    };

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
                <div style={{ marginBottom: 34 }}>
                    <button
                        className="button is-link"
                        style={{
                            position: "fixed",
                            top: 34,
                            right: 0,
                            width: "615px",
                            borderRadius: 0
                        }}
                        onClick={this.navigateBack}
                    >
                        Back
                    </button>
                </div>
                {this.props.classSections.map(({ details, className }) => {
                    return (
                        <div>
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    textAlign: "center",
                                    backgroundColor: "#00376B",
                                    color: "white",
                                    padding: "6px"
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
                                            fontSize: 11,
                                            backgroundColor: "#D3D3D3",
                                            textAlign: "center"
                                        }}
                                    >
                                        <th>Status</th>
                                        <th>Class</th>
                                        <th>Prof.</th>
                                        <th>Room</th>
                                        <th>Section</th>
                                        <th>Time</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details.map((detail, index) => {
                                        return (
                                            <tr
                                                className="classSection"
                                                style={{
                                                    fontSize: 12,
                                                    textAlign: "left"
                                                }}
                                                onClick={() =>
                                                    this.addClassToCalendar(
                                                        detail,
                                                        className
                                                    )
                                                }
                                            >
                                                <td>
                                                    {this.renderStatus(
                                                        detail.status
                                                    )}
                                                </td>
                                                <td
                                                    // style={{ color: "#3366BB" }}
                                                    onClick={async () => {
                                                        const res = await getClassInfo(
                                                            detail.classNumber
                                                        );
                                                        console.log(res);
                                                    }}
                                                >
                                                    {detail.code}
                                                </td>
                                                <td>{detail.professor}</td>
                                                <td>{detail.room}</td>
                                                <td>{detail.section}</td>
                                                <td>{detail.time}</td>
                                                <td>{detail.dates}</td>
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

function mapStateToProps(state) {
    return {
        classSections: state.console ? state.console.classSections : []
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addClass: details => dispatch(addClass(details)),
        updateDisplay: display => dispatch(updateDisplay(display))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassSections);
