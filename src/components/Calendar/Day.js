import React, { Component } from "react";
import Hour from "./Hour";
import "./style.css";
import { START_HOUR, END_HOUR } from "./index";

class Day extends Component {
    renderHourCells() {
        const rows = [];
        const classes = {};
        if (this.props.classes) {
            this.props.classes.forEach(_class => {
                const time = _class.time.split("-");
                const startTime = time[0].split(":");
                const endTime = time[1].split(":");
                const startHour = +startTime[0];
                const endHour = +endTime[0];
                const am_pm = _class.time.substring(
                    _class.time.length - 2,
                    _class.time.length
                );
                classes[
                    startHour +
                        (am_pm === "PM" &&
                        endHour >= startHour &&
                        endHour !== 12
                            ? 12
                            : 0)
                ] = [_class];
            });
        }
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            rows.push(<Hour key={hour} classes={classes[hour]} />);
        }
        return rows;
    }

    render() {
        return <div className="hourCells">{this.renderHourCells()}</div>;
    }
}

export default Day;
