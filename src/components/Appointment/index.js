import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import { useVisualMode } from "../../hooks/useVisualMode";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

function Appointment(props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function deleteInt(id) {
    transition(DELETING);
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
  }

  function onCancelDelete() {
    transition(SHOW);
  }

  function onEdit(student, interviewer) {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show onEdit={onEdit} onDelete={confirmDelete} student={props.interview.student} interviewer={props.interview.interviewer} id={props.id} />}
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back(EMPTY)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete your appointment?"} id={props.id} onConfirm={deleteInt} onCancel={onCancelDelete} />}
      {mode === EDIT && <Form onSave={save} student={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} id={props.id} onCancel={() => back(SHOW)}  />}
    </article>
  );
}

export default Appointment;