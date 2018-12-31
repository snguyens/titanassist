import { instance } from "../utils/apiConfig";

export const updateClassSections = classSections => ({
    type: "UPDATE_CLASS_SECTIONS",
    classSections
});

export const updateDisplay = display => ({
    type: "UPDATE_DISPLAY",
    display
});

export const searchOnPress = configs => {
    return async function(dispatch) {
        const { data } = await instance.get("/classSections", {
            params: { subject: configs.subject }
        });
        dispatch(updateClassSections(data));
        dispatch(updateDisplay("CLASS_SECTIONS"));
    };
};
