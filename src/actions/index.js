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

export const addClass = details => ({
    type: "ADD_CLASS",
    class: details
});

export const removeClass = code => ({
    type: "REMOVE_CLASS",
    code
});

export const updateClassNumber = classNumber => ({
    type: "UPDATE_CLASS_NUMBER",
    classNumber
});

export const searchForClasses = configs => {
    return async function(dispatch) {
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
        }
    };
};
