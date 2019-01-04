import React, { Component } from "react";
import "./App.css";
import Calendar from "./components/Calendar/";
import Console from "./components/Console";

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <div
                    style={{
                        borderBottom: "2px solid #FE6800",
                        backgroundColor: "#00376B",
                        color: "white",
                        padding: "5px",
                        fontWeight: "bold",
                        display: "flex"
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            textAlign: "left",
                            paddingLeft: "10px",
                            fontSize: 15
                        }}
                    >
                        TitanAssist
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: 12
                        }}
                    >
                        <div style={{ flex: 1, paddingRight: "20px" }}>
                            About
                        </div>
                        <div style={{ flex: 1, paddingRight: "10px" }}>
                            Suggest
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto"
                        }}
                    >
                        <Calendar />
                    </div>
                    <div
                        style={{
                            height: "100vh",
                            overflow: "auto",
                            minWidth: "615px",
                            maxWidth: "615px",
                            padding: "15px"
                        }}
                    >
                        <Console />
                    </div>
                </div>
            </div>
        );
    }
}
