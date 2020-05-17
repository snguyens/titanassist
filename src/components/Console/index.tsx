import React from "react";
import Search from "./Search";
import ClassInfo from "./ClassInfo";
import ClassSections from "./ClassSections";
import { SEARCH, CLASS_INFO, CLASS_SECTIONS } from "../../constants/display";
import { useSelector, useDispatch } from "react-redux";
import { updateDisplay } from "../../actions";

const routes: {
  [routeName: string]: {
    component: JSX.Element;
    renderBackButton?: boolean;
  };
} = {
  [SEARCH]: {
    component: <Search />
  },
  [CLASS_SECTIONS]: {
    component: <ClassSections />,
    renderBackButton: true
  },
  [CLASS_INFO]: {
    component: <ClassInfo />,
    renderBackButton: true
  }
};

const Console = () => {
  const dispatch = useDispatch();

  const { display } = useSelector((state: any) => ({
    display: state.console.display
  }));

  //Renders the right-hand portion of the application. The user can search classes, view class info, etc...
  function renderConsole() {
    if (routes[display]) {
      return routes[display].component;
    }

    return routes[Object.keys(routes)[0]].component;
  }

  function renderBackButton() {
    //Only display the back button on certain routes
    if (!routes[display] || !routes[display].renderBackButton) {
      return;
    }

    const navigateBackwards = () => {
      //Generate an array of route names
      const routeNames: string[] = Object.keys(routes);

      //Find the index in the array where the route name matches with prop.display.
      const index: number =
        routeNames.findIndex((routeName) => routeName === display) - 1;

      //Check to make sure index is within bounds.
      if (index < 0 || index > routeNames.length - 1) {
        return;
      }

      //Update the display to show the new route
      dispatch(updateDisplay(routeNames[index]));
    };

    return (
      <div style={styles.container}>
        <button
          className="button is-link"
          style={styles.button}
          onClick={navigateBackwards}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div>
      {renderBackButton()}
      {renderConsole()}
    </div>
  );
};

const styles: any = {
  container: { marginBottom: 34 },
  button: {
    position: "fixed",
    top: 34,
    right: 0,
    width: "615px",
    borderRadius: 0
  }
};

export default Console;
