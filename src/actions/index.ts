import { getClassSections } from "../services";
import { CLASS_SECTIONS } from "../constants/display";
import {
  ClassSection,
  ClassDetailsCalendar,
  SearchOptions
} from "../interfaces";

export const updateClassSections = (classSections: ClassSection) => ({
  type: "UPDATE_CLASS_SECTIONS",
  classSections
});

export const updateDisplay = (display: string) => ({
  type: "UPDATE_DISPLAY",
  display
});

export const addClass = (
  details: ClassDetailsCalendar & { className: string }
) => ({
  type: "ADD_CLASS",
  class: details
});

export const removeClass = (code: string) => ({
  type: "REMOVE_CLASS",
  code
});

export const updateClassNumber = (classNumber: number) => ({
  type: "UPDATE_CLASS_NUMBER",
  classNumber
});

export const searchForClasses = (configs: SearchOptions) => {
  return async function(dispatch: any) {
    try {
      const classSections = await getClassSections(configs);
      dispatch(updateClassSections(classSections));
      dispatch(updateDisplay(CLASS_SECTIONS));
    } catch (e) {
      if (e.response.status === 409) {
        window.alert(
          "The search will exceed the maximum limit of 300 sections. Please refine your search"
        );
      }
      window.alert("An unexpected error has occurred!");
    }
  };
};
