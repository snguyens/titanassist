import React, { Component } from "react";
import Hour from "./Hour";
import "./style.css";
import { START_HOUR, END_HOUR } from "./index";
import { connect } from "react-redux";
import moment from "moment";

const Day = (props: {
  Monday: any;
  Tuesday: any;
  Wednesday: any;
  Thursday: any;
  Friday: any;
}) => {
  const renderHourCells = (classes: any) => {
    //All the Hour components that are going to be rendered for a particular day
    const rows: any = [];

    //Represents the class information that will be passed into the Hour component
    const classMap: any = {};

    //Map used to determine how to divide classes that fall within the same time range
    const sizeMap: any = {};

    for (let i = 0; i < classes.length; i++) {
      const totalTimes = [
        { time: classes[i].time.split(" - "), code: classes[i].code }
      ];
      const localVisitedMap: any = {};
      for (let j = 0; j < classes.length; j++) {
        if (i === j || localVisitedMap[classes[j].code]) continue;
        const childTime = classes[j].time.split(" - ");
        for (const { time } of totalTimes) {
          //we skip if:
          //the start date === end date of another class
          //the end date === start date of another class
          if (
            moment(childTime[0], "h:mma").isSame(moment(time[1], "h:mma")) ||
            moment(childTime[1], "h:mma").isSame(moment(time[0], "h:mma"))
          ) {
            continue;
          }

          //TODO: refactor this beast
          if (
            (moment(childTime[0], "h:mma") <= moment(time[0], "h:mma") &&
              moment(childTime[1], "h:mma") >= moment(time[1], "h:mma")) ||
            (moment(childTime[0], "h:mma") >= moment(time[0], "h:mma") &&
              moment(childTime[1], "h:mma") <= moment(time[1], "h:mma")) ||
            (moment(childTime[0], "h:mma") <= moment(time[1], "h:mma") &&
              moment(childTime[0], "h:mma") >= moment(time[0], "h:mma")) ||
            (moment(childTime[1], "h:mma") >= moment(time[0], "h:mma") &&
              moment(childTime[1], "h:mma") <= moment(time[1], "h:mma"))
          ) {
            totalTimes.push({
              time: childTime,
              code: classes[j].code
            });
            localVisitedMap[classes[j].code] = true;
            j = 0;
            break;
          }
        }
      }
      totalTimes.forEach(({ code }, i) => {
        sizeMap[code] = {
          index: i,
          totalSize: totalTimes.length
        };
      });
    }

    classes.forEach((currClass: any) => {
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
        (am_pm === "PM" && endHour >= startHour && endHour !== 12 ? 12 : 0);
      classMap[key] = classMap[key]
        ? [...classMap[key], currClass]
        : [currClass];
    });
    for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
      rows.push(<Hour key={hour} classes={classMap[hour]} />);
    }
    return rows;
  };

  const hourCells: any = [
    props.Monday,
    props.Tuesday,
    props.Wednesday,
    props.Thursday,
    props.Friday
  ].map((classes: any, i: number) => {
    return (
      <div className="hourCells" key={i}>
        {renderHourCells(classes)}
      </div>
    );
  });

  return hourCells;
};

function mapStateToProps(state: any) {
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
