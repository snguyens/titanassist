import React, { Component } from "react";

const defaultProps = {
    classSections: []
};

class ClassSections extends Component {
    render() {
        return (
            <div>
                {this.props.classSections.map(({ details, className }) => {
                    return (
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: 12 }}>
                                {className}
                            </div>
                            {details.map(
                                ({
                                    code,
                                    dates,
                                    professor,
                                    room,
                                    section,
                                    time
                                }) => {
                                    return (
                                        <div>
                                            {code}, {dates}, {professor},{room},{" "}
                                            {section}, {time}
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}

ClassSections.defaultProps = defaultProps;

export default ClassSections;
