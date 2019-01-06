import React, { Component } from "react";
import "./App.css";
import Calendar from "./components/Calendar/";
import Console from "./components/Console";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideConsole: false
        };
    }
    toggleConsole = () => {
        this.setState(prevState => ({
            hideConsole: !prevState.hideConsole
        }));
    };
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
                        <div
                            style={{
                                flex: 1,
                                whiteSpace: "nowrap",
                                paddingRight: "20px"
                            }}
                            onClick={this.toggleConsole}
                        >
                            Hide Search
                        </div>
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
                    {!this.state.hideConsole && (
                        <div
                            style={{
                                height: "100vh",
                                overflow: "auto",
                                minWidth: "615px",
                                maxWidth: "615px"
                            }}
                        >
                            <Console />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
