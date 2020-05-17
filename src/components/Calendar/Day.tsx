import React, { Fragment } from "react";
import Hour from "./Hour";
import "./style.css";
import { useSelector } from "react-redux";
import moment from "moment";
import { START_HOUR, END_HOUR } from "../../configs/calendar";

const Day = () => {
  const { Monday, Tuesday, Wednesday, Thursday, Friday } = useSelector(
    (state: any) => ({
      Monday: state.classSchedule.Monday,
      Tuesday: state.classSchedule.Tuesday,
      Wednesday: state.classSchedule.Wednesday,
      Thursday: state.classSchedule.Thursday,
      Friday: state.classSchedule.Friday
    })
  );

  const renderHourCells = (classes: any) => {
    const rows: JSX.Element[] = [];

    const classMap: any = generateClassMap(classes);

    for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
      rows.push(<Hour key={hour} classes={classMap[hour]} />);
    }
    return rows;
  };

  const generateClassMap = (classes: any) => {
    const classMap: any = {};
    const sizeMap: any = generateSizeMap(classes);

    classes.forEach((currClass: any) => {
      if (sizeMap[currClass.code]) {
        currClass.cell = sizeMap[currClass.code];
      }
      const time = currClass.time.split("-");
      const startTime = time[0].split(":");
      const endTime = time[1].split(":");
      const startHour = +startTime[0];
      const endHour = +endTime[0];
      const meridiem = currClass.time.substring(
        currClass.time.length - 2,
        currClass.time.length
      );
      const key =
        startHour +
        (meridiem === "PM" && endHour >= startHour && endHour !== 12 ? 12 : 0);
      classMap[key] = classMap[key]
        ? [...classMap[key], currClass]
        : [currClass];
    });

    return classMap;
  };

  const generateSizeMap = (classes: any) => {
    //Map used to determine how to divide classes that fall within the same time range
    const sizeMap: { [key: number]: { index: number; totalSize: number } } = {};

    for (let i = 0; i < classes.length; i++) {
      const totalTimes = [
        { time: classes[i].time.split(" - "), code: classes[i].code }
      ];

      const localVisitedMap: { [key: number]: boolean } = {};

      for (let j = 0; j < classes.length; j++) {
        if (i === j || localVisitedMap[classes[j].code]) {
          continue;
        }
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

    return sizeMap;
  };

  const hourCells: any = [Monday, Tuesday, Wednesday, Thursday, Friday].map(
    (classes: any, i: number) => {
      return (
        <div className="hourCells" key={i}>
          {renderHourCells(classes)}
        </div>
      );
    }
  );

  return <Fragment>{hourCells}</Fragment>;
};

export default Day;
