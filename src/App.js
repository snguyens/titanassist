import React, { Component } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Console from "./components/Console";

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            flex: 1
                        }}
                    >
                        <Calendar />
                    </div>
                    <div
                        style={{
                            flex: 1
                        }}
                    >
                        <Console />
                    </div>
                </div>
            </div>
        );
    }
}
