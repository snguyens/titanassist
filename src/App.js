import React, { Component } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
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
                        marginBottom: "10px",
                        textAlign: "left",
                        fontSize: 15,
                        fontWeight: "bold"
                    }}
                >
                    TitanAssist
                </div>
                <div style={{ display: "flex" }}>
                    <div
                        style={{
                            flex: 1,
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
                            minWidth: "550px",
                            maxWidth: "550px",
                            flexGrow: 1
                        }}
                    >
                        <Console />
                    </div>
                </div>
            </div>
        );
    }
}
