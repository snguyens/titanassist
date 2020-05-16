import React from "react";
import Day from "./Day";
import "./style.css";
import { START_HOUR, END_HOUR, DAYS } from "../../configs/calendar";

const Calendar = () => {
  const renderDayHeaders = () => {
    return (
      <div className="columns is-mobile header" style={{ height: "40px" }}>
        <div className="column is-narrow">
          <div style={{ width: "45px" }} />
        </div>
        {DAYS.map((day, i) => {
          return (
            <div className="column" key={i}>
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  const renderHourHeaders = () => {
    const hourSlots: JSX.Element[] = [];
    for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
      //Once the time passes 12pm, we need to subtract 12 hours
      const currentHour = hour <= 12 ? hour : hour - 12;

      const meridiem = hour >= 12 ? "PM" : "AM";

      hourSlots.push(
        <div className="column timeCell" key={hour}>
          <p style={{ textAlign: "right", marginLeft: "5px" }}>
            {currentHour}
            {meridiem}
          </p>
        </div>
      );
    }
    return (
      <div className="columns is-mobile timeContainer">
        <div className="hourHeaders">{hourSlots}</div>
        <Day />
      </div>
    );
  };

  return (
    <div className="widthContainer">
      {renderDayHeaders()}
      {renderHourHeaders()}
    </div>
  );
};

export default Calendar;
