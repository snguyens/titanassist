import React, { Component } from "react";

export default class Search extends Component {
    render() {
        return (
            <div>
                Search for Classes
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Term</div>
                        <div style={{ flex: 1 }}>Summer 2018</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Subject</div>
                        <div style={{ flex: 1 }}>Computer Science</div>
                    </div>
                </div>
            </div>
        );
    }
}
