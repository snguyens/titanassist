import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { getClassInfo } from "../../services";

const ClassInfo = ({ classNumber }: { classNumber: number }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [classInfo, setClassInfo] = useState<any>();

  useEffect(() => {
    const fn = async () => {
      const data = await getClassInfo(classNumber);
      setClassInfo(data);
      setIsLoading(false);
    };
    fn();
  }, []);

  if (isLoading) {
    return <div className="loader" />;
  }

  return (
    <div>
      <div>
        <div>
          Enrolled:
          {classInfo.enrollmentTotal} / {classInfo.combinedSectionCap}
        </div>
        <div>
          Waitlist:
          {classInfo.waitListTotal} / {classInfo.waitListCap}
        </div>
        <div>Status: {classInfo.status}</div>
        <div>Class Number: {classInfo.classNumber}</div>
        <div>Units: {classInfo.units}</div>
        <div>Dates: {classInfo.dates}</div>
        <div>Location: {classInfo.location}</div>
        <div>Notes: {classInfo.notes}</div>
        <div>Description: {classInfo.description}</div>
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    classNumber: state.console ? state.console.classNumber : null
  };
}

export default connect(
  mapStateToProps,
  null
)(ClassInfo);
