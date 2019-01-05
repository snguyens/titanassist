import React, { Component } from "react";
import { careerMap } from "../constants/career";
import { locationMap } from "../constants/location";
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
            career: "",
            location: "",
            showOpenClassesOnly: false
        };
    }

    searchForClasses = async () => {
        this.setState({ isLoading: true });
        try {
            await this.props.searchForClasses({
                subject: this.state.subject,
                term: this.state.term,
                career: this.state.career,
                location: this.state.location,
                showOpenClassesOnly: this.state.showOpenClassesOnly
            });
        } catch (e) {
            window.alert(
                `An error has occurred while trying to search for classes!`
            );
        }
        this.setState({ isLoading: false });
    };

    handleChange = (state, event) => {
        this.setState({ [state]: event.target.value });
    };

    renderDropDown(configs) {
        const { stateKey, map, header, initialValue } = configs;
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingBottom: "5px"
                }}
            >
                <div style={{ flex: 1 }}>{header}:</div>

                <div style={{ flex: 2 }}>
                    <div className="select is-small">
                        <select
                            value={this.state[stateKey]}
                            onChange={e => this.handleChange(stateKey, e)}
                            disabled={this.state.isLoading}
                        >
                            {initialValue && <option>{initialValue}</option>}

                            {Object.keys(map).map((item, i) => {
                                return (
                                    <option value={item} key={i}>
                                        {map[item]}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    renderInputField(configs) {
        const { stateKey, header, placeholder } = configs;
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingBottom: "5px"
                }}
            >
                <div style={{ flex: 1 }}>{header}:</div>

                <div style={{ flex: 2 }}>
                    <input
                        style={{ width: "35%" }}
                        className="input is-small"
                        type="text"
                        value={this.state[stateKey]}
                        onChange={e => this.handleChange(stateKey, e)}
                        placeholder={placeholder}
                        disabled={this.state.isLoading}
                    />
                </div>
            </div>
        );
    }

    renderCheckbox(configs) {
        const { stateKey, header, placeholder } = configs;
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingBottom: "5px"
                }}
            >
                <div style={{ flex: 1 }}>{header}:</div>

                <div style={{ flex: 2 }}>
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={this.state.showOpenClassesOnly}
                            onChange={() => {
                                this.setState(prevState => ({
                                    showOpenClassesOnly: !prevState.showOpenClassesOnly
                                }));
                            }}
                            disabled={this.state.isLoading}
                        />
                    </label>
                </div>
            </div>
        );
    }

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
                    {this.renderDropDown({
                        stateKey: "term",
                        map: termMap,
                        header: "Term"
                    })}
                    {this.renderDropDown({
                        stateKey: "subject",
                        map: subjectMap,
                        header: "Subject",
                        initialValue: " "
                    })}

                    {this.renderInputField({
                        stateKey: "courseNumber",
                        header: "Course Number/Range",
                        placeholder: "300, 200-400"
                    })}

                    {this.renderDropDown({
                        stateKey: "career",
                        map: careerMap,
                        header: "Course Career",
                        initialValue: "Any"
                    })}

                    {this.renderDropDown({
                        stateKey: "location",
                        map: locationMap,
                        header: "Location",
                        initialValue: "Any"
                    })}

                    {this.renderCheckbox({
                        header: "Show Open Classes Only"
                    })}
                </div>
                <button
                    className={
                        "button is-link " +
                        (this.state.isLoading ? "is-loading" : "")
                    }
                    loading={this.state.isLoading.toString()}
                    style={{ marginTop: "50px" }}
                    onClick={this.searchForClasses}
                >
                    Search
                </button>
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
