import React, { Component } from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";

const defaultProps = {
    items: []
};

class DropDown extends Component {
    render() {
        return (
            <DropdownButton
                bsSize={"xsmall"}
                style={{
                    width: "300px"
                }}
                title=""
            >
                {this.props.items.map(({ name }) => (
                    <MenuItem
                        style={{
                            fontSize: 11,
                            width: "300px"
                        }}
                    >
                        {name}
                    </MenuItem>
                ))}
            </DropdownButton>
        );
    }
}

DropDown.defaultProps = defaultProps;

export default DropDown;
