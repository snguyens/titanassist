import { api } from "../utils/apiConfig";
import { getClassSections } from "../services";
import { CLASS_SECTIONS } from "../constants/display";

export const updateClassSections = classSections => ({
    type: "UPDATE_CLASS_SECTIONS",
    classSections
});

export const updateDisplay = display => ({
    type: "UPDATE_DISPLAY",
    display
});

export const searchForClasses = configs => {
    return async function(dispatch) {
        const classSections = await getClassSections(configs);
        dispatch(updateClassSections(classSections));
        dispatch(updateDisplay(CLASS_SECTIONS));
    };
};
