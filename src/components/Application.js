import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import axios from "axios";

import "components/Application.scss";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const baseURL = "http://192.168.1.69:8001";
    const days = axios.get(`${baseURL}/api/days`);
    const appointments = axios.get(`${baseURL}/api/appointments`);
    const promises = [days, appointments];
    Promise.all(promises)
      .then((arrOfResponses) => {
        setState(prev => ({ ...prev, days: arrOfResponses[0].data, appointments: arrOfResponses[1].data }))})
  }, []);
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        <ul>
          {dailyAppointments.map(appointment => {
            return (
              <Appointment key={appointment.id} {...appointment} />
            );
          })}
          <Appointment key="last" time="5pm" />
        </ul>
      </section>
    </main>
  );
}
