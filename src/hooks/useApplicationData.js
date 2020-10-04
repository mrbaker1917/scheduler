import { useReducer, useEffect } from "react";
import axios from "axios";

export function useApplicationData(initial) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const [state, dispatch] = useReducer( reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY: 
        return {
          ...state,
          day: action.day
        };
      
      case SET_APPLICATION_DATA: 
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };
        
      case SET_INTERVIEW:
        {
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
            appointments
          }
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  function bookInterview(appointment_id, interview) {
    const newDays = state.days.map((day) => {
      if (day.appointments.includes(appointment_id)) {
        day.spots = day.spots - 1;
      }
      return day;
    });

    return axios
      .put(`/api/appointments/${appointment_id}`, { interview })
      .then((response) => {
        if (response.status === 204) {
          dispatch({ type: SET_INTERVIEW,
            appointment_id, interview, newDays
          });
        }
      });
  }

  function cancelInterview(appointment_id) {

    const newDays = state.days.map((day) => {
      if (day.appointments.includes(appointment_id)) {
        day.spots = day.spots + 1;
      }
      return day;
    });

    return axios.delete(`/api/appointments/${appointment_id}`).then((response) => {
      if (response.status === 204) {
        dispatch({ type: SET_INTERVIEW,
          appointment_id, interview: null, newDays
        });
      }
    });
  }

  useEffect(() => {
    const baseURL = "http://192.168.1.69:8001";
    const days = axios.get(`${baseURL}/api/days`);
    const appointments = axios.get(`${baseURL}/api/appointments`);
    const interviewers = axios.get(`${baseURL}/api/interviewers`);
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
