import React, { useState } from "react";
import Calendar from "../components/Calendar/";
import Console from "../components/Console";

const Main = () => {
  const [hideConsole, toggleHideConsole] = useState(false);

  const toggleConsole = () => {
    toggleHideConsole(!hideConsole);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>TitanAssist</div>
        <div style={styles.leftContainer}>
          <div style={styles.hideSearch} onClick={toggleConsole}>
            Hide Search
          </div>
          <div style={styles.about}>About</div>
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
        {!hideConsole && (
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
};

const styles: any = {
  container: {
    textAlign: "center"
  },
  header: {
    borderBottom: "2px solid #FE6800",
    backgroundColor: "#00376B",
    color: "white",
    padding: "5px",
    fontWeight: "bold",
    display: "flex"
  },
  title: {
    flex: 1,
    textAlign: "left",
    paddingLeft: "10px",
    fontSize: 15
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: 12
  },
  hideSearch: {
    flex: 1,
    whiteSpace: "nowrap",
    paddingRight: "20px"
  },
  about: { flex: 1, paddingRight: "20px" }
};

export default Main;
