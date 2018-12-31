import { api } from "../utils/apiConfig";
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
        const { data } = await api.get("/classSections", {
            params: { subject: configs.subject }
        });
        dispatch(updateClassSections(data));
        dispatch(updateDisplay(CLASS_SECTIONS));
    };
};
