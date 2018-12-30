import React, { Component } from "react";
import { instance } from "../utils/apiConfig";

export default class ClassSections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classSections: []
        };
    }

    async componentDidMount() {
        await this.retrieveClassSections();
    }

    async retrieveClassSections() {
        const { data } = await instance.get("/classSections");
        this.setState({ classSections: data });
    }

    render() {
        return (
            <div>
                {this.state.classSections.map(({ details, className }) => {
                    return <div>{className}</div>;
                })}
            </div>
        );
    }
}
