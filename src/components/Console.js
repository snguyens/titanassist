import React, { Component } from "react";
import Search from "./Search";

export default class Console extends Component {
    render() {
        return (
            <div
                style={{
                    backgroundColor: "yellow"
                }}
            >
                <Search />
            </div>
        );
    }
}
