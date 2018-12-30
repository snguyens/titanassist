import React, { Component } from "react";
import { Button, DropdownButton, MenuItem } from "react-bootstrap";
import DropDown from "./DropDown";

export default class Search extends Component {
    render() {
        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Term</div>

                        <div style={{ flex: 3 }}>
                            <DropDown items={[{ name: "Summer 2018" }]} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flex: 1 }}>Subject</div>

                        <div style={{ flex: 3 }}>
                            <DropDown
                                items={[
                                    { name: "Biology" },
                                    { name: "Computer Science" }
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <Button bsStyle="primary" style={{ marginTop: "50px" }}>
                    Search
                </Button>
            </div>
        );
    }
}
