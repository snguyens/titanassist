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
      const currentClasses = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ].reduce((acc, curr) => {
        for (const { code } of state[curr]) {
          acc.add(code);
        }
        return acc;
      }, new Set());

      if (currentClasses.has(action.class.code)) {
        window.alert("You have already added that class!");
        return state;
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

      const colorIndex =
        state.colorIndex >= classColors.length ? 0 : state.colorIndex;

      //action.class.time example: ["TuTh", "8:30AM", "-", "9:45AM"]
      const splitTime = action.class.time.split(" ");
      const classDays = splitTime[0];
      const classTime = splitTime[1] + " - " + splitTime[3];

      const color = classColors[colorIndex];

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
        Monday: [...state.Monday, ...Monday],
        Tuesday: [...state.Tuesday, ...Tuesday],
        Wednesday: [...state.Wednesday, ...Wednesday],
        Thursday: [...state.Thursday, ...Thursday],
        Friday: [...state.Friday, ...Friday],
        colorIndex: colorIndex + 1
      };
    case "REMOVE_CLASS":
      const newState = {
        Monday: [...state.Monday],
        Tuesday: [...state.Tuesday],
        Wednesday: [...state.Wednesday],
        Thursday: [...state.Thursday],
        Friday: [...state.Friday],
        colorIndex:
          state.colorIndex - 1 >= 0
            ? state.colorIndex - 1
            : classColors.length - 1
      };
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      for (const day of days) {
        for (let i = 0; i < newState[day].length; ) {
          if (newState[day][i].code === action.code) {
            newState[day].splice(i, 1);
          } else {
            i++;
          }
        }
      }

      return newState;
    default:
      return state;
  }
};

export default classSchedule;
