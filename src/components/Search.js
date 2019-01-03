import React, { Component } from "react";
import { careerMap } from "../constants/career";
import { subjectMap } from "../constants/subjects";
import { termMap } from "../constants/terms";
import { connect } from "react-redux";
import { searchForClasses } from "../actions";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            subject: "",
            term: 2193,
            courseNumber: "",
            career: ""
        };
    }

    searchForClasses = async () => {
        this.setState({ isLoading: true });
        try {
            await this.props.searchForClasses({
                subject: this.state.subject,
                term: this.state.term,
                career: this.state.career
            });
        } catch (e) {
            //todo: show error notification/message
        }
        this.setState({ isLoading: false });
    };

    handleTermChange = event => {
        this.setState({ term: event.target.value });
    };

    handleSubjectChange = event => {
        this.setState({ subject: event.target.value });
    };

    handleCourseNumberChange = event => {
        this.setState({ courseNumber: event.target.value });
    };
    handleCareerChange = event => {
        this.setState({ career: event.target.value });
        console.log(this.state.career);
    };

    render() {
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left"
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Term:</div>

                        <div style={{ flex: 2 }}>
                            <div className="select is-small">
                                <select
                                    value={this.state.term}
                                    onChange={this.handleTermChange}
                                >
                                    {Object.keys(termMap).map(term => {
                                        return (
                                            <option value={term}>
                                                {termMap[term]}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Subject:</div>

                        <div style={{ flex: 2 }}>
                            <div className="select is-small">
                                <select
                                    value={this.state.subject}
                                    onChange={this.handleSubjectChange}
                                >
                                    <option />
                                    {Object.keys(subjectMap).map(subject => {
                                        return (
                                            <option value={subject}>
                                                {subjectMap[subject]}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Course Number/Range:</div>

                        <div style={{ flex: 2 }}>
                            <input
                                style={{ width: "35%" }}
                                className="input is-small"
                                type="text"
                                value={this.state.courseNumber}
                                onChange={this.handleCourseNumberChange}
                                placeholder="300, 200-400, < 200"
                            />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Course Career:</div>

                        <div style={{ flex: 2 }}>
                            <div className="select is-small">
                                <select
                                    value={this.state.career}
                                    onChange={this.handleCareerChange}
                                >
                                    <option>Any</option>>
                                    {Object.keys(careerMap).map(career => {
                                        return (
                                            <option value={career}>
                                                {careerMap[career]}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <a
                    className={
                        "button is-link " +
                        (this.state.isLoading ? "is-loading" : "")
                    }
                    bsStyle=""
                    loading={this.state.isLoading}
                    style={{ marginTop: "50px" }}
                    onClick={this.searchForClasses}
                >
                    Search
                </a>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchForClasses: configs => dispatch(searchForClasses(configs))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Search);
