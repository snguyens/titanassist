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
            const splitTime = action.class.time.split(" ");
            const day = splitTime[0];
            const time = splitTime[1] + " - " + splitTime[3];
            const randomColor =
                classColors[Math.floor(Math.random() * classColors.length)];
            for (let i = 0; i < day.length; i += 2) {
                let ptr;
                if (day.substring(i, i + 2) === "Mo") {
                    ptr = Monday;
                }
                if (day.substring(i, i + 2) === "Tu") {
                    ptr = Tuesday;
                }
                if (day.substring(i, i + 2) === "We") {
                    ptr = Wednesday;
                }
                if (day.substring(i, i + 2) === "Th") {
                    ptr = Thursday;
                }
                if (day.substring(i, i + 2) === "Fr") {
                    ptr = Friday;
                }
                if (ptr) {
                    ptr.push({
                        time,
                        code: action.class.code,
                        location: action.class.room,
                        className: action.class.className.split(" - ")[0],
                        color: randomColor
                    });
                }
            }
            return {
                ...state,
                Monday: [...state.Monday, ...Monday],
                Tuesday: [...state.Tuesday, ...Tuesday],
                Wednesday: [...state.Wednesday, ...Wednesday],
                Thursday: [...state.Thursday, ...Thursday],
                Friday: [...state.Friday, ...Friday]
            };
        case "REMOVE_CLASS":
            const days = [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ];
            const newState = {
                ...state,
                Monday: [...state.Monday],
                Tuesday: [...state.Tuesday],
                Wednesday: [...state.Wednesday],
                Thursday: [...state.Thursday],
                Friday: [...state.Friday]
            };
            for (const day of days) {
                for (let i = 0; i < state[day].length; i++) {
                    if (state[day][i].code === action.code) {
                        const newArray = [...state[day]];
                        newArray.splice(i, 1);
                        newState[day] = newArray;
                    }
                }
            }
            return newState;
        default:
            return state;
    }
};

export default classSchedule;

//MoWe 11:30AM - 12:45PM
