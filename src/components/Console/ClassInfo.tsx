import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getClassInfo } from "../../services";

const ClassInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [classInfo, setClassInfo] = useState<any>();

  const { consoleClassNumber } = useSelector((state: any) => ({
    consoleClassNumber: state.console ? state.console.classNumber : null
  }));

  useEffect(() => {
    const fn = async () => {
      const data = await getClassInfo(consoleClassNumber);
      setClassInfo(data);
      setIsLoading(false);
    };
    fn();
  }, []);

  if (isLoading) {
    return <div className="loader" />;
  }

  //TODO: styling
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

export default ClassInfo;
