import React, { Component } from "react";
import Search from "./Search";
import ClassInfo from "./ClassInfo";
import ClassSections from "./ClassSections";
import { SEARCH, CLASS_INFO, CLASS_SECTIONS } from "../constants/display";
import { connect } from "react-redux";
import { addClass, updateDisplay } from "../actions";

class Console extends Component {
    changeView = () => {
        if (this.props.display === CLASS_SECTIONS) {
            this.props.updateDisplay(SEARCH);
        }
        if (this.props.display === CLASS_INFO) {
            this.props.updateDisplay(CLASS_SECTIONS);
        }
    };

    renderSwitch() {
        switch (this.props.display) {
            case SEARCH:
                return <Search />;
            case CLASS_SECTIONS:
                return <ClassSections />;
            case CLASS_INFO:
                return <ClassInfo />;
            default:
                return <Search />;
        }
    }

    render() {
        return (
            <div>
                {[CLASS_SECTIONS, CLASS_INFO].includes(this.props.display) && (
                    <div style={{ marginBottom: 34 }}>
                        <button
                            className="button is-link"
                            style={{
                                position: "fixed",
                                top: 34,
                                right: 0,
                                width: "615px",
                                borderRadius: 0
                            }}
                            onClick={this.changeView}
                        >
                            Back
                        </button>
                    </div>
                )}
                {this.renderSwitch()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        display: state.console ? state.console.display : ""
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addClass: details => dispatch(addClass(details)),
        updateDisplay: display => dispatch(updateDisplay(display))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Console);
