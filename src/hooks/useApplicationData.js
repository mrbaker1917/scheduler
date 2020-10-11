import { useReducer, useEffect } from "react";
import axios from "axios";

export function useApplicationData(initial) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  function reducer(state, action) {
    switch (action.type) {
      // case SET_DAY:
      //   return {
      //     ...state,
      //     day: action.day,
      //   };

      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };

      case SET_INTERVIEW: {
        const newDays = state.days.map((day) => {
          if (day.appointments.includes(action.appointment_id) && state.appointments[action.appointment_id].interview === null) {
            return { ...day, spots: day.spots - 1 };
          }
          if (day.appointments.includes(action.appointment_id) && action.interview === null) {
            return { ...day, spots: day.spots + 1 };
          }
          return day;
        });
        const appointment = {
          ...state.appointments[action.appointment_id],
          interview: action.interview && { ...action.interview },
        };
        const appointments = {
          ...state.appointments,
          [action.appointment_id]: appointment,
        };
        return {
          ...state,
          appointments,
          days: newDays,
        };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  function bookInterview(appointment_id, interview) {
    return axios
      .put(`/api/appointments/${appointment_id}`, { interview })
      .then((response) => {
        if (response.status === 204) {
          dispatch({ type: SET_INTERVIEW, appointment_id, interview });
        }
      });
  }

  function cancelInterview(appointment_id) {
    return axios
      .delete(`/api/appointments/${appointment_id}`)
      .then((response) => {
        if (response.status === 204) {
          dispatch({
            type: SET_INTERVIEW,
            appointment_id,
            interview: null
          });
        }
      });
  }

  useEffect(() => {
    //const baseURL = "http://192.168.1.69:8001";
    const days = axios.get(`/api/days`);
    const appointments = axios.get(`/api/appointments`);
    const interviewers = axios.get(`/api/interviewers`);
    const promises = [days, appointments, interviewers];
    Promise.all(promises).then((arrOfResponses) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: arrOfResponses[0].data,
        appointments: arrOfResponses[1].data,
        interviewers: arrOfResponses[2].data,
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
