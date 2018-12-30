import React, { Component } from "react";
import Search from "./Search";
import ClassSections from "./ClassSections";
import { instance } from "../utils/apiConfig";

const SEARCH = "SEARCH";
const CLASS_SECTIONS = "CLASS_SECTIONS";

export default class Console extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classSections: [],
            display: SEARCH
        };
    }

    searchOnPress = async () => {
        const { data } = await instance.get("/classSections");
        this.setState({ classSections: data, display: CLASS_SECTIONS });
    };

    renderSwitch() {
        switch (this.state.display) {
            case SEARCH:
                return <Search searchOnPress={this.searchOnPress} />;
            case CLASS_SECTIONS:
                return (
                    <ClassSections classSections={this.state.classSections} />
                );
        }
    }

    render() {
        return <div>{this.renderSwitch()}</div>;
    }
}
