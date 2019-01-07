import React, { Component } from "react";
import Hour from "./Hour";
import "./style.css";
import { START_HOUR, END_HOUR } from "./index";
import { connect } from "react-redux";
import moment from "moment";

class Day extends Component {
    renderHourCells(classes) {
        //All the Hour components that are going to be rendered for a particular day
        const rows = [];

        //Represents the class information that will be passed into the Hour component
        const classMap = {};

        //Used to keep track of which nodes have been visited when determining classes that fall within the same time range
        const visitedMap = {};

        //Map used to determine how to divide classes that fall within the same time range
        const sizeMap = {};

        for (let i = 0; i < classes.length; i++) {
            if (visitedMap[classes[i].code]) continue;
            const totalTimes = [
                { time: classes[i].time.split(" - "), code: classes[i].code }
            ];
            for (let j = 0; j < classes.length; j++) {
                if (i === j || visitedMap[classes[j].code]) continue;
                const childTime = classes[j].time.split(" - ");
                for (const { time } of totalTimes) {
                    if (
                        (moment(childTime[0], "h:mma") <
                            moment(time[1], "h:mma") &&
                            moment(childTime[0], "h:mma") >
                                moment(time[0], "h:mma")) ||
                        (moment(childTime[1], "h:mma") >
                            moment(time[0], "h:mma") &&
                            moment(childTime[1], "h:mma") <
                                moment(time[1], "h:mma"))
                    ) {
                        totalTimes.push({
                            time: childTime,
                            code: classes[j].code
                        });
                        visitedMap[classes[j].code] = true;
                        break;
                    }
                }
            }
            visitedMap[classes[i].code] = true;
            for (let i = 0; i < totalTimes.length; i++) {
                const { code } = totalTimes[i];
                sizeMap[code] = {
                    index: i,
                    totalSize: totalTimes.length
                };
            }
        }

        classes.forEach(currClass => {
            if (sizeMap[currClass.code]) {
                currClass.cell = sizeMap[currClass.code];
            }
            const time = currClass.time.split("-");
            const startTime = time[0].split(":");
            const endTime = time[1].split(":");
            const startHour = +startTime[0];
            const endHour = +endTime[0];
            const am_pm = currClass.time.substring(
                currClass.time.length - 2,
                currClass.time.length
            );
            const key =
                startHour +
                (am_pm === "PM" && endHour >= startHour && endHour !== 12
                    ? 12
                    : 0);
            classMap[key] = classMap[key]
                ? [...classMap[key], currClass]
                : [currClass];
        });
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            rows.push(<Hour key={hour} classes={classMap[hour]} />);
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
        ].map((classes, i) => {
            return (
                <div className="hourCells" key={i}>
                    {this.renderHourCells(classes)}
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
