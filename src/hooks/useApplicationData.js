import { useState, useEffect } from "react";
import axios from 'axios';

export function useApplicationData(initial) {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: []
});
const setDay = day => setState({ ...state, day });

function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.put(`/api/appointments/${id}`, { interview })
    .then(response => {
      if (response.status === 204) {
        setState({
          ...state,
          appointments
        });
      }
    });
}

function cancelInterview(id) {
  
  const appointment = {
    ...state.appointments[id],
    interview: null
  }
  const appointments = {
    ...state.appointments,
    [id]: appointment
  }

  return axios.delete(`/api/appointments/${id}`)
  .then(response => {
    if (response.status === 204) {
      setState({
        ...state,
        appointments
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
  Promise.all(promises)
    .then((arrOfResponses) => {
      setState(prev => ({ ...prev, days: arrOfResponses[0].data, appointments: arrOfResponses[1].data, interviewers: arrOfResponses[2].data }))
    })
}, []);

  return { state, setDay, bookInterview, cancelInterview }
}