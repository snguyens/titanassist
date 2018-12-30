import React, { Component } from "react";
import Search from "./Search";
import ClassSections from "./ClassSections";

const SEARCH = "SEARCH";
const CLASS_SECTIONS = "CLASS_SECTIONS";

export default class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: SEARCH
        };
    }

    searchOnPress = () => {
        this.setState({
            display: CLASS_SECTIONS
        });
    };

    renderSwitch() {
        switch (this.state.display) {
            case SEARCH:
                return <Search searchOnPress={this.searchOnPress} />;
            case CLASS_SECTIONS:
                return <ClassSections />;
        }
    }

    render() {
        return <div>{this.renderSwitch()}</div>;
    }
}
