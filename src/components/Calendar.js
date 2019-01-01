import React, { Component } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const times = [
    "6AM",
    "7AM",
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM"
];

export default class Calendar extends Component {
    render() {
        return (
            <div>
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "16px",
                        marginLeft: "55px",
                        marginRight: "15px"
                    }}
                >
                    {days.map(day => {
                        return (
                            <span style={{ textDecoration: "underline" }}>
                                {day}
                            </span>
                        );
                    })}
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "5px"
                    }}
                >
                    {times.map(time => {
                        return (
                            <span
                                style={{
                                    fontSize: "16px",
                                    paddingBottom: "35px"
                                }}
                            >
                                {time}
                            </span>
                        );
                    })}
                </div>
            </div>
        );
    }
}
