import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addClass, updateDisplay, updateClassNumber } from "../../actions";
import { CLASS_INFO } from "../../constants/display";

const ClassSections = () => {
  const dispatch = useDispatch();

  const { classSections } = useSelector((state: any) => ({
    classSections: state.console.classSections
  }));

  const viewClassInfo = (classNumber: number) => {
    dispatch(updateClassNumber(classNumber));
    dispatch(updateDisplay(CLASS_INFO));
  };

  const addClassToCalendar = (detail: any, className: any) => {
    //Some classes might not have their times yet, prevent the user from adding those classes.
    if (detail.time === "TBA") {
      window.alert(`The time for class ${detail.code} is currently TBA!`);
      return;
    }

    dispatch(
      addClass({
        ...detail,
        className
      })
    );
  };

  const openRMP = (pkId: any) => {
    window.open(`http://www.ratemyprofessors.com/ShowRatings.jsp?tid=${pkId}`);
  };

  const renderStatus = (status: "OPEN" | "CLOSED" | "WAITLIST") => {
    const statusMap: {
      [status: string]: { color: string; text: string };
    } = {
      OPEN: {
        color: "green",
        text: "OPEN"
      },
      CLOSED: {
        color: "red",
        text: "CLOSED"
      },
      WAITLIST: {
        color: "orange",
        text: "WAITL"
      }
    };

    const statusProperties = statusMap[status];

    if (!statusProperties) {
      return;
    }

    return (
      <span style={{ color: statusProperties.color, fontWeight: "bold" }}>
        {statusProperties.text}
      </span>
    );
  };

  const renderClassSections = () => {
    return classSections.map(({ details, className }: any, index: number) => (
      <div key={index}>
        <div style={styles.className}>{className}</div>

        <table className="table is-bordered is-hoverable" style={styles.table}>
          <thead>
            <tr style={styles.tableRow}>
              <th>Status</th>
              <th>Class</th>
              <th>Prof.</th>
              <th>Room</th>
              <th>Section</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail: any, index: number) => (
              <tr style={styles.class} key={index}>
                <td onClick={() => addClassToCalendar(detail, className)}>
                  {renderStatus(detail.status)}
                </td>
                <td onClick={() => viewClassInfo(detail.classNumber)}>
                  {detail.code}
                </td>
                {detail.professor.details ? (
                  <td
                    style={styles.professor}
                    onClick={() => openRMP(detail.professor.details.pkId)}
                  >
                    {`${detail.professor.name} [${detail.professor.details.averageRating}]`}
                  </td>
                ) : (
                  <td>{detail.professor.name}</td>
                )}
                <td>{detail.room}</td>
                <td>{detail.section}</td>
                <td>{detail.time}</td>
                <td>{detail.dates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  return <div>{renderClassSections()}</div>;
};

const styles: any = {
  class: {
    cursor: "pointer",
    fontSize: 12,
    textAlign: "left"
  },
  className: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    backgroundColor: "#00376B",
    color: "white",
    padding: "6px"
  },
  professor: {
    color: "#3366BB"
  },
  table: {
    marginBottom: 0,
    width: "100%"
  },
  tableRow: {
    fontSize: 11,
    backgroundColor: "#D3D3D3",
    textAlign: "center"
  }
};

export default ClassSections;
