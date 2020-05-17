import React, { Component } from "react";
import "./style.css";
import { removeClass } from "../../actions";
import { connect, useDispatch } from "react-redux";
import { ClassSection } from "../../interfaces";
import { computeTopAndBottom } from "../../utilities/computeClassCellSize";

interface Props {
  classes: ClassSection[];
}

interface Style {
  backgroundColor: string;
  top: number;
  bottom: number;
  width?: string;
  left?: string;
}

const Hour = ({ classes = [] }: Props) => {
  const dispatch = useDispatch();

  const renderClasses = () => {
    return classes.map(({ time, color, cell, code, className }, index) => {
      //Example: class is from 11:30AM - 2:20 PM

      //currentCLass.time would be in the format: "11:30AM - 2:20PM"
      const { bottom, top } = computeTopAndBottom(time);

      //Handles size changing if there are multiple classes that fall within the same time
      const style: Style = {
        backgroundColor: color,
        top: top,
        bottom: bottom
      };

      if (cell.totalSize > 1) {
        style.width = `${100 / cell.totalSize}%`;
        style.left = `${(100 / cell.totalSize) * cell.index}%`;
      }

      return (
        <div
          className="classContainer"
          style={style}
          key={index}
          onClick={() => dispatch(removeClass(code))}
        >
          <div className="font">
            {`${time}`}
            <br />
            {`${className}`}
            <br />
            {`(${code})`}
          </div>
        </div>
      );
    });
  };

  return <div className="column hourContainer">{renderClasses()}</div>;
};

export default Hour;
