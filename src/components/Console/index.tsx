import React from "react";
import Search from "./Search";
import ClassInfo from "./ClassInfo";
import ClassSections from "./ClassSections";
import { SEARCH, CLASS_INFO, CLASS_SECTIONS } from "../../constants/display";
import { connect } from "react-redux";
import { addClass, updateDisplay } from "../../actions";

interface Props {
  display: string;
  updateDisplay(x: string): any;
}

//Temporary data structure, still trying to think of a better interface for this
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

function Console(props: Props) {
  //Renders the right-hand portion of the application. The user can search classes, view class info, etc...
  function renderConsole() {
    if (routes[props.display]) {
      return routes[props.display].component;
    }

    return routes[Object.keys(routes)[0]].component;
  }

  function renderBackButton() {
    //Only display the back button on certain routes
    if (!routes[props.display] || !routes[props.display].renderBackButton) {
      return;
    }

    const navigateBackwards = () => {
      //Generate an array of route names
      const routeNames: string[] = Object.keys(routes);

      //Find the index in the array where the route name matches with prop.display.
      const index: number =
        routeNames.findIndex(routeName => routeName === props.display) - 1;

      //Check to make sure index is within bounds.
      if (index < 0 || index > routeNames.length - 1) {
        return;
      }

      //Update the display to show the new route
      props.updateDisplay(routeNames[index]);
    };

    //TODO: get rid of inline styling
    return (
      <div style={{ marginBottom: 34 }}>
        <button
          className="button is-link"
          style={{
            position: "fixed",
            top: 34,
            right: 0,
            width: "615px",
            borderRadius: 0
          }}
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
}

function mapStateToProps(state: any): { display: string } {
  return {
    display: state.console ? state.console.display : ""
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    addClass: (details: any) => dispatch(addClass(details)),
    updateDisplay: (display: any) => dispatch(updateDisplay(display))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);
