import React from "react";
import Day from "./Day";
import "./style.css";

export const START_HOUR = 6;
export const END_HOUR = 23;

const Calendar = () => {
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
    return hourSlots;
  };

  //Header text to render on top of the component. TODO: add Sat/Sun support
  const headers = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="widthContainer">
      <div className="columns is-mobile header" style={{ height: "40px" }}>
        <div className="column is-narrow">
          <div style={{ width: "45px" }} />
        </div>
        {headers.map((day, i) => {
          return (
            <div className="column" key={i}>
              {day}
            </div>
          );
        })}
      </div>
      <div className="columns is-mobile timeContainer">
        <div className="hourHeaders">{renderHourHeaders()}</div>
        <Day />
      </div>
    </div>
  );
};

export default Calendar;
