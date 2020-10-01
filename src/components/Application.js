import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import axios from "axios";

import "components/Application.scss";
import InterviewerList from "./InterviewerList";
import Appointment from "components/Appointment";

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "2pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Jasper Baker-McCue",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Lily Baker-McCue",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "5pm",
  }
];

export default function Application() {
  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  const baseURL = "http://192.168.1.69:8001";

  useEffect(() => {
    axios.get(`${baseURL}/api/days`)
      .then(response => {
        const daysApi = (response.data);
        setDays(daysApi)
      });
  }, []);

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
          {appointments.map(appointment => {
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
