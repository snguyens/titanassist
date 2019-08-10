import React, { Component } from "react";
import "./style.css";
import { removeClass } from "../../actions";
import { connect } from "react-redux";

const CELL_HEIGHT_PX = 60;

interface Style {
    backgroundColor: string;
    top: number;
    bottom: number;
    width?: string;
    left?: string;
}

interface Props {
    classes: {
        color: string;
        cell: {
            index: number;
            totalSize: number;
        };
        time: string;
        className: string;
        code: string;
    }[];
    removeClass: (x: string) => {};
}

function Hour(props: Props) {
    function renderClasses() {
        const classes: JSX.Element[] = [];
        props.classes.forEach((currentClass, index) => {
            const time = currentClass.time.split("-");
            const startTime = time[0].split(":");
            const endTime = time[1].split(":");
            const startHour = parseInt(startTime[0], 10);
            const startMinute = parseInt(startTime[1], 10);
            let endHour = parseInt(endTime[0], 10);
            endHour = startHour > endHour ? endHour + 12 : endHour;
            const endMinute = parseInt(endTime[1].slice(0, -1), 10);
            const minuteDiff =
                (endHour * 60 + endMinute - (startHour * 60 + startMinute)) /
                60;
            const top = (startMinute / 60) * CELL_HEIGHT_PX;
            let bottom = minuteDiff * CELL_HEIGHT_PX + top - CELL_HEIGHT_PX; //570 - 420 = 150
            bottom =
                minuteDiff > 60 ? 1 * Math.floor(minuteDiff) * -1 : bottom * -1;

            //Handles size changing if there are multiple classes that fall within the same time
            const style: Style = {
                backgroundColor: currentClass.color,
                top: top,
                bottom: bottom
            };
            if (currentClass.cell.totalSize > 1) {
                style.width = `${100 / currentClass.cell.totalSize}%`;
                style.left = `${(100 / currentClass.cell.totalSize) *
                    currentClass.cell.index}%`;
            }

            classes.push(
                <div
                    className="classContainer"
                    style={style}
                    key={index}
                    onClick={() => {
                        props.removeClass(currentClass.code);
                    }}
                >
                    <div className="font">
                        {`${currentClass.time}`}
                        <br />
                        {`${currentClass.className}`}
                        <br />
                        {`(${currentClass.code})`}
                    </div>
                </div>
            );
        });
        return classes;
    }

    return <div className="column hourContainer">{renderClasses()}</div>;
}

Hour.defaultProps = {
    classes: []
};

function mapDispatchToProps(dispatch: any) {
    return {
        removeClass: (code: string) => dispatch(removeClass(code))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Hour);
