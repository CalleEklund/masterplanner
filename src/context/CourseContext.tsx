import { createContext, useContext, useReducer } from "react";
import { Course } from "~/types/course";
import { api } from "~/utils/api";

export type CourseState = {
  year_7: {
    period_1: Course[];
    period_2: Course[];
  };
  year_8: {
    period_1: Course[];
    period_2: Course[];
  };
  year_9: {
    period_1: Course[];
    period_2: Course[];
  };
  year_10: {
    period_1: Course[];
    period_2: Course[];
  };
};

type CourseAction = {
  type: string;
  payload: Course;
  year: number;
  period: number;
};

const initialState: CourseState = {
  year_7: {
    period_1: [],
    period_2: [],
  },
  year_8: {
    period_1: [],
    period_2: [],
  },
  year_9: {
    period_1: [],
    period_2: [],
  },
  year_10: {
    period_1: [],
    period_2: [],
  },
};

export type YearKey = keyof typeof initialState;
export type PeriodKey = keyof typeof initialState.year_7;
const CourseContext = createContext<CourseState>(initialState);
const CourseDispatchContext = createContext<any>(null);

export const useCourse = () => {
  const selectedCourses = useContext(CourseContext);

  const getCoursesByYear = (year: number) => {
    const yearKey = `year_${year}` as YearKey;
    if (!selectedCourses) return null;
    return selectedCourses[yearKey];
  };

  return { selectedCourses, getCoursesByYear };
};
export const useCourseDispatch = () => useContext(CourseDispatchContext);

export const CourseProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  return (
    <CourseContext.Provider value={state}>
      <CourseDispatchContext.Provider value={dispatch}>
        {children}
      </CourseDispatchContext.Provider>
    </CourseContext.Provider>
  );
};

const courseReducer = (state: CourseState, action: CourseAction): any => {
  let yearKey;
  let periodKey;

  switch (action.type) {
    case "ADD_COURSE":
      yearKey = `year_${action.payload.year}` as YearKey;
      periodKey = `period_${action.payload.periodNum}` as PeriodKey;
      if (
        state[yearKey][periodKey].find(
          (course: Course) => course.id === action.payload.id
        )
      ) {
        return state;
      }
      return {
        ...state,
        [yearKey]: {
          ...state[yearKey],
          [periodKey]: [...state[yearKey][periodKey], action.payload],
        },
      };
    case "REMOVE_COURSE":
      yearKey = `year_${action.payload.year}` as YearKey;
      periodKey = `period_${action.payload.periodNum}` as PeriodKey;
      if (action.payload.credit.includes("*")) {
        return {
          ...state,
          [yearKey]: {
            period_1: state[yearKey].period_1.filter(
              (course) => course.code !== action.payload.code
            ),
            period_2: state[yearKey].period_2.filter(
              (course) => course.code !== action.payload.code
            ),
          },
        };
      }
      return {
        ...state,
        [yearKey]: {
          ...state[yearKey],
          [periodKey]: state[yearKey][periodKey].filter(
            (course) => course.id !== action.payload.id
          ),
        },
      };
    case "RESET":
      return {
        ...initialState,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
