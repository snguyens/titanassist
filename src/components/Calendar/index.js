import React, { Component } from "react";
import Day from "./Day";
import "./style.css";

export const START_HOUR = 6;
export const END_HOUR = 23;

class Calendar extends Component {
    renderHourHeaders() {
        const hourSlots = [];
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            hourSlots.push(
                <div className="column timeCell" key={hour}>
                    <p style={{ textAlign: "right", marginLeft: "5px" }}>
                        {hour <= 12 ? hour : hour - 12}
                        {hour >= 12 ? "PM" : "AM"}
                    </p>
                </div>
            );
        }
        return hourSlots;
    }

    render() {
        return (
            <div className="widthContainer">
                <div
                    className="columns is-mobile header"
                    style={{ height: "40px" }}
                >
                    <div className="column is-narrow">
                        <div style={{ width: "45px" }} />
                    </div>
                    {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => {
                        return (
                            <div className="column" key={i}>
                                {day}
                            </div>
                        );
                    })}
                </div>
                <div className="columns is-mobile timeContainer">
                    <div className="hourHeaders">
                        {this.renderHourHeaders()}
                    </div>
                    <Day />
                </div>
            </div>
        );
    }
}

export default Calendar;
