import React, { Component, Dispatch, SetStateAction, useState } from "react";
import { careerMap } from "../../constants/career";
import { locationMap } from "../../constants/location";
import { subjectMap } from "../../constants/subjects";
import { termMap } from "../../constants/terms";
import { connect } from "react-redux";
import { searchForClasses } from "../../actions";

interface DropDownConfigs {
  state: any;
  setter: Dispatch<SetStateAction<any>>;
  map: any;
  header: string;
  initialValue?: string;
}

interface InputFieldConfigs {
  state: any;
  setter: Dispatch<SetStateAction<any>>;
  header: string;
  placeholder: string;
}

interface CheckBoxConfigs {
  header: string;
}

interface SearchForClasses {
  subject: string;
  term: number;
  career: string;
  location: string;
  showOpenClassesOnly: boolean;
}

const Search = ({ searchForClasses }: { searchForClasses: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [term, setTerm] = useState(2193);
  const [courseNumber, setCourseNumber] = useState("");
  const [career, setCareer] = useState("");
  const [location, setLocation] = useState("");
  const [showOpenClassesOnly, setShowOpenClassesOnly] = useState(false);

  const handleSearchForClasses = async () => {
    setIsLoading(true);
    try {
      await searchForClasses({
        subject,
        term,
        career,
        location,
        showOpenClassesOnly
      });
    } catch (e) {
      window.alert(`An error has occurred while trying to search for classes!`);
    }
    setIsLoading(false);
  };

  const renderDropDown = (configs: DropDownConfigs) => {
    const { state, setter, map, header, initialValue } = configs;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: "5px"
        }}
      >
        <div style={{ flex: 1 }}>{header}:</div>

        <div style={{ flex: 2 }}>
          <div className="select is-small">
            <select
              value={state}
              onChange={(e) => setter(e.target.value)}
              disabled={isLoading}
            >
              {initialValue && <option>{initialValue}</option>}

              {Object.keys(map).map((item, i) => {
                return (
                  <option value={item} key={i}>
                    {map[item]}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderInputField = (configs: InputFieldConfigs) => {
    const { state, setter, header, placeholder } = configs;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: "5px"
        }}
      >
        <div style={{ flex: 1 }}>{header}:</div>

        <div style={{ flex: 2 }}>
          <input
            style={{ width: "35%" }}
            className="input is-small"
            type="text"
            value={state}
            onChange={(e) => setter(e)}
            placeholder={placeholder}
            disabled={isLoading}
          />
        </div>
      </div>
    );
  };

  const renderCheckbox = (configs: CheckBoxConfigs) => {
    const { header } = configs;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: "5px"
        }}
      >
        <div style={{ flex: 1 }}>{header}:</div>

        <div style={{ flex: 2 }}>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={showOpenClassesOnly}
              onChange={() => setShowOpenClassesOnly(!showOpenClassesOnly)}
              disabled={isLoading}
            />
          </label>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left"
        }}
      >
        {renderDropDown({
          state: term,
          setter: setTerm,
          map: termMap,
          header: "Term"
        })}
        {renderDropDown({
          state: subject,
          setter: setSubject,
          map: subjectMap,
          header: "Subject",
          initialValue: " "
        })}

        {renderInputField({
          state: courseNumber,
          setter: setCourseNumber,
          header: "Course Number/Range",
          placeholder: "300, 200-400"
        })}

        {renderDropDown({
          state: career,
          setter: setCareer,
          map: careerMap,
          header: "Course Career",
          initialValue: "Any"
        })}

        {renderDropDown({
          state: location,
          setter: setLocation,
          map: locationMap,
          header: "Location",
          initialValue: "Any"
        })}

        {renderCheckbox({
          header: "Show Open Classes Only"
        })}
      </div>
      <button
        className={"button is-link " + (isLoading ? "is-loading" : "")}
        style={{ marginTop: "50px" }}
        onClick={handleSearchForClasses}
      >
        Search
      </button>
    </div>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    searchForClasses: (configs: SearchForClasses) =>
      dispatch(searchForClasses(configs))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Search);
