import React from "react";
import { connect } from "react-redux";
import { addClass, updateDisplay, updateClassNumber } from "../../actions";
import { CLASS_INFO } from "../../constants/display";
import "./ClassSections.css";

interface Props {
    updateClassNumber: any;
    updateDisplay: any;
    addClass: any;
    classSections: any;
}

type Status = "OPEN" | "CLOSED" | "WAITLIST";

function ClassSections(props: Props) {
    function viewClassInfo(classNumber: number) {
        props.updateClassNumber(classNumber);
        props.updateDisplay(CLASS_INFO);
    }

    function addClassToCalendar(detail: any, className: any) {
        //Some classes might not have their times yet, prevent the user from adding those classes.
        if (detail.time === "TBA") {
            window.alert(`The time for class ${detail.code} is currently TBA!`);
            return;
        }

        props.addClass({
            ...detail,
            className
        });
    }

    function openRMP(pkId: any) {
        window.open(
            `http://www.ratemyprofessors.com/ShowRatings.jsp?tid=${pkId}`
        );
    }

    function renderStatus(status: Status) {
        const statusMap: {
            [status: string]: { color: string; text: string };
        } = {
            OPEN: {
                color: "green",
                text: "OPEN"
            },
            CLOSED: {
                color: "red",
                text: "CLOSED"
            },
            WAITLIST: {
                color: "orange",
                text: "WAITL"
            }
        };

        const statusProperties = statusMap[status];

        //If status is not in the map, don't render anything
        if (!statusProperties) {
            return;
        }

        return (
            <span style={{ color: statusProperties.color, fontWeight: "bold" }}>
                {statusProperties.text}
            </span>
        );
    }

    return (
        <div>
            {props.classSections.map(
                ({ details, className }: any, index: number) => {
                    return (
                        <div key={index}>
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
                                    {details.map(
                                        (detail: any, index: number) => {
                                            return (
                                                <tr
                                                    className="classSection"
                                                    style={{
                                                        fontSize: 12,
                                                        textAlign: "left"
                                                    }}
                                                    key={index}
                                                >
                                                    <td
                                                        onClick={() =>
                                                            addClassToCalendar(
                                                                detail,
                                                                className
                                                            )
                                                        }
                                                    >
                                                        {renderStatus(
                                                            detail.status
                                                        )}
                                                    </td>
                                                    <td
                                                        onClick={() =>
                                                            viewClassInfo(
                                                                detail.classNumber
                                                            )
                                                        }
                                                    >
                                                        {detail.code}
                                                    </td>
                                                    {detail.professor
                                                        .details ? (
                                                        <td
                                                            style={{
                                                                color: "#3366BB"
                                                            }}
                                                            onClick={() =>
                                                                openRMP(
                                                                    detail
                                                                        .professor
                                                                        .details
                                                                        .pkId
                                                                )
                                                            }
                                                        >
                                                            {`${
                                                                detail.professor
                                                                    .name
                                                            } [${
                                                                detail.professor
                                                                    .details
                                                                    .averageRating
                                                            }]`}
                                                        </td>
                                                    ) : (
                                                        <td>
                                                            {
                                                                detail.professor
                                                                    .name
                                                            }
                                                        </td>
                                                    )}
                                                    <td>{detail.room}</td>
                                                    <td>{detail.section}</td>
                                                    <td>{detail.time}</td>
                                                    <td>{detail.dates}</td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    );
                }
            )}
        </div>
    );
}

function mapStateToProps(state: any) {
    return {
        classSections: state.console ? state.console.classSections : []
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        addClass: (details: any) => dispatch(addClass(details)),
        updateDisplay: (display: any) => dispatch(updateDisplay(display)),
        updateClassNumber: (classNumber: any) =>
            dispatch(updateClassNumber(classNumber))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassSections);
