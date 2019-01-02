const classColors = [
    "#deb887",
    "#20b2aa",
    "#cd5c5c",
    "#ba55d3",
    "#4169e1",
    "#ff6347",
    "#32cd32"
];

const classSchedule = (
    state = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: []
    },
    action
) => {
    switch (action.type) {
        case "ADD_CLASS":
            const Monday = [];
            const Tuesday = [];
            const Wednesday = [];
            const Thursday = [];
            const Friday = [];
            // const newState = Object.assign({}, state);
            const splitTime = action.class.time.split(" ");
            const day = splitTime[0];
            const time = splitTime[1] + " - " + splitTime[3];
            for (let i = 0; i < day.length; i += 2) {
                if (day.substring(i, i + 2) === "Mo") {
                    Monday.push({
                        time,
                        code: action.class.code,
                        location: action.class.room,
                        className: action.class.className.split(" - ")[0],
                        color:
                            classColors[
                                Math.floor(Math.random() * classColors.length)
                            ]
                    });
                }
                if (day.substring(i, i + 2) === "Tu") {
                    Tuesday.push({
                        time,
                        code: action.class.code,
                        location: action.class.room,
                        className: action.class.className.split(" - ")[0],
                        color:
                            classColors[
                                Math.floor(Math.random() * classColors.length)
                            ]
                    });
                }
                if (day.substring(i, i + 2) === "We") {
                    Wednesday.push({
                        time,
                        code: action.class.code,
                        location: action.class.room,
                        className: action.class.className.split(" - ")[0],
                        color:
                            classColors[
                                Math.floor(Math.random() * classColors.length)
                            ]
                    });
                }
                if (day.substring(i, i + 2) === "Th") {
                    Thursday.push({
                        time,
                        code: action.class.code,
                        location: action.class.room,
                        className: action.class.className.split(" - ")[0],
                        color:
                            classColors[
                                Math.floor(Math.random() * classColors.length)
                            ]
                    });
                }
                if (day.substring(i, i + 2) === "Fr") {
                    Friday.push({
                        time,
                        code: action.class.code,
                        location: action.class.room,
                        className: action.class.className.split(" - ")[0],
                        color:
                            classColors[
                                Math.floor(Math.random() * classColors.length)
                            ]
                    });
                }
            }
            return {
                ...state,
                Monday: [...state.Monday, ...Monday],
                Tuesday: [...state.Tuesday, ...Tuesday],
                Wednesday: [...state.Wednesday, ...Wednesday],
                Thursday: [...state.Monday, ...Thursday],
                Friday: [...state.Monday, ...Friday]
            };
        default:
            return state;
    }
};

export default classSchedule;

//MoWe 11:30AM - 12:45PM
