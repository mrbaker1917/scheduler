import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import { useVisualMode } from "../../hooks/useVisualMode";
import Form from './Form';

function Appointment(props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {mode === CREATE && <Form save={save} interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}
    </article>
  );
}

export default Appointment;