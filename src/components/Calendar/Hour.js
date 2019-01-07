import React, { Component } from "react";
import "./style.css";
import { removeClass } from "../../actions";
import { connect } from "react-redux";

const CELL_HEIGHT_PX = 60;

class Hour extends Component {
    static defaultProps = {
        classes: []
    };

    renderClasses() {
        const classes = [];
        this.props.classes.forEach((currClass, index) => {
            const time = currClass.time.split("-");
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
            const style = {
                backgroundColor: currClass.color,
                top: top,
                bottom: bottom
            };
            if (currClass.cell.totalSize > 1) {
                style.width = `${100 / currClass.cell.totalSize}%`;
                style.left = `${(100 / currClass.cell.totalSize) * index}%`;
            }

            classes.push(
                <div
                    className="classContainer"
                    style={style}
                    key={index}
                    onClick={() => {
                        this.props.removeClass(currClass.code);
                    }}
                >
                    <div className="font">
                        {`${currClass.time}`}
                        <br />
                        {`${currClass.className}`}
                        <br />
                        {`(${currClass.code})`}
                    </div>
                </div>
            );
        });
        return classes;
    }

    render() {
        return (
            <div className="column hourContainer">{this.renderClasses()}</div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeClass: code => dispatch(removeClass(code))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Hour);
