import React, { Component } from "react";
import Hour from "./Hour";
import "./style.css";
import { connect } from "react-redux";

export const START_HOUR = 6;
export const END_HOUR = 23;

class Day extends Component {
    // constructor(props) {
    //     super(props);
    //     const hours = {};
    //     for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    //         this.setState({ [hour]: [] });
    //         hours[hour] = [];
    //     }
    //     this.state = hours;
    // }
    // componentWillReceiveProps() {
    //     this.props.classes.forEach(_class => {
    //         const time = _class.time.split("-");
    //         const startTime = time[0].split(":");
    //         const endTime = time[1].split(":");
    //         const startHour = +startTime[0];
    //         const endHour = +endTime[0];
    //         const am_pm = _class.time.substring(
    //             _class.time.length - 2,
    //             _class.time.length
    //         );
    //         this.setState({
    //             [startHour +
    //             (am_pm === "PM" && endHour >= startHour ? 12 : 0)]: [_class]
    //         });
    //     });
    // }

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
                        (am_pm === "PM" && endHour >= startHour ? 12 : 0)
                ] = [_class];
                // this.setState({
                //     [startHour +
                //     (am_pm === "PM" && endHour >= startHour ? 12 : 0)]: [_class]
                // });
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
