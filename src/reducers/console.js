const console = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_CLASS_SECTIONS":
            return Object.assign({}, state, {
                classSections: action.classSections
            });
        case "UPDATE_DISPLAY":
            return Object.assign({}, state, { display: action.display });
        case "UPDATE_CLASS_NUMBER":
            return Object.assign({}, state, {
                classNumber: action.classNumber
            });
        default:
            return state;
    }
};

export default console;
