import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getClassInfo } from "../../services";
import { IClassDetails } from "../../interfaces";

const ClassDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [classInfo, setClassInfo] = useState<IClassDetails>();

  const { consoleClassNumber } = useSelector((state: any) => ({
    consoleClassNumber: state.console.classNumber
  }));

  useEffect(() => {
    const fn = async () => {
      const data = await getClassInfo(consoleClassNumber);
      setClassInfo(data);
      setIsLoading(false);
    };
    fn();
  }, []);

  if (isLoading || !classInfo) {
    return <div className="loader" />;
  }

  //TODO: add styling
  return (
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
  );
};

export default ClassDetails;
