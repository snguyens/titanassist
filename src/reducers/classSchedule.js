import classColors from "../constants/classColors";

const classSchedule = (
    state = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        colorIndex: Math.floor(Math.random() * classColors.length)
    },
    action
) => {
    switch (action.type) {
        case "ADD_CLASS":
            if (state.colorIndex >= classColors.length) {
                state.colorIndex = 0;
            }
            for (const day of [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ]) {
                for (const classes of state[day]) {
                    if (classes.code === action.class.code) {
                        window.alert("You have already added that class!");
                        return state;
                    }
                }
            }

            const Monday = [];
            const Tuesday = [];
            const Wednesday = [];
            const Thursday = [];
            const Friday = [];
            const dayMap = {
                Mo: Monday,
                Tu: Tuesday,
                We: Wednesday,
                Th: Thursday,
                Fr: Friday
            };
            const splitTime = action.class.time.split(" ");
            const classDays = splitTime[0];
            const classTime = splitTime[1] + " - " + splitTime[3];
            const color = classColors[state.colorIndex++];
            for (let i = 0; i < classDays.length; i += 2) {
                for (const day of Object.keys(dayMap)) {
                    if (classDays.substring(i, i + 2) === day) {
                        dayMap[day].push({
                            time: classTime,
                            code: action.class.code,
                            location: action.class.room,
                            className: action.class.className.split(" - ")[0],
                            color
                        });
                    }
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
                let newArray = state[day];
                for (let i = 0; i < newArray.length; ) {
                    if (newArray[i].code === action.code) {
                        newArray.splice(i, 1);
                        newState[day] = newArray;
                    } else {
                        i++;
                    }
                }
            }
            newState["colorIndex"] = state.colorIndex - 1;
            return newState;
        default:
            return state;
    }
};

export default classSchedule;
