import React, { Component } from "react";
import Hour from "./Hour";
import "./style.css";
import { START_HOUR, END_HOUR } from "./index";
import { connect } from "react-redux";

class Day extends Component {
    renderHourCells(day) {
        const rows = [];
        const classes = {};
        day.forEach(_class => {
            const time = _class.time.split("-");
            const startTime = time[0].split(":");
            const endTime = time[1].split(":");
            const startHour = +startTime[0];
            const endHour = +endTime[0];
            const am_pm = _class.time.substring(
                _class.time.length - 2,
                _class.time.length
            );
            const key =
                startHour +
                (am_pm === "PM" && endHour >= startHour && endHour !== 12
                    ? 12
                    : 0);
            classes[key] = classes[key] ? [...classes[key], _class] : [_class];
        });
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            rows.push(<Hour key={hour} classes={classes[hour]} />);
        }
        return rows;
    }

    render() {
        return [
            this.props.Monday,
            this.props.Tuesday,
            this.props.Wednesday,
            this.props.Thursday,
            this.props.Friday
        ].map((day, i) => {
            return (
                <div className="hourCells" key={i}>
                    {this.renderHourCells(day)}
                </div>
            );
        });
    }
}

function mapStateToProps(state) {
    return {
        Monday: state.classSchedule.Monday,
        Tuesday: state.classSchedule.Tuesday,
        Wednesday: state.classSchedule.Wednesday,
        Thursday: state.classSchedule.Thursday,
        Friday: state.classSchedule.Friday
    };
}

export default connect(
    mapStateToProps,
    null
)(Day);
