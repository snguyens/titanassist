import React, { Component } from "react";
import Day from "./Day";
import "./style.css";
import { connect } from "react-redux";

export const START_HOUR = 6;
export const END_HOUR = 23;

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: {
                Monday: [],
                Tuesday: [],
                Wednesday: [],
                Thursday: [],
                Friday: []
            },
            colorIndex: 0
        };
    }

    renderHourHeaders() {
        const hourSlots = [];
        for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
            hourSlots.push(
                <div className="column timeCell" key={hour}>
                    {hour <= 12 ? hour : hour - 12}
                    {hour >= 12 ? "PM" : "AM"}
                </div>
            );
        }
        return hourSlots;
    }

    render() {
        return (
            <div
                className="widthContainer"
                style={{
                    width: "95%",
                    marginLeft: "15px"
                }}
            >
                <div
                    className="columns is-mobile header"
                    style={{ height: "40px" }}
                >
                    <div className="column is-narrow">
                        <div style={{ width: "45px" }} />
                    </div>
                    {/* {["Mon", "Tue", "Wed", "Thu", "Fri"].map(day => {
                        return (
                            <div
                                className="column"
                                style={{
                                    border: "1px solid black",
                                    borderRight: "none"
                                }}
                            >
                                {day}
                            </div>
                        );
                    })} */}
                    <div className="column" style={{}}>
                        Mon
                    </div>
                    <div className="column" style={{}}>
                        Tue
                    </div>
                    <div className="column" style={{}}>
                        Wed
                    </div>
                    <div className="column" style={{}}>
                        Thu
                    </div>
                    <div className="column" style={{}}>
                        Fri
                    </div>
                </div>
                <div className="columns is-mobile timeContainer">
                    <div className="hourHeaders">
                        {this.renderHourHeaders()}
                    </div>
                    <Day classes={this.props.Monday} />
                    <Day classes={this.props.Tuesday} />
                    <Day classes={this.props.Wednesday} />
                    <Day classes={this.props.Thursday} />
                    <Day classes={this.props.Friday} />
                </div>
            </div>
        );
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
)(Calendar);
