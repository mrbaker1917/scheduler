import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";

function Appointment(props) {
  return (
    <article className="appointment">
      <Header time="12pm" />
      {/* <Empty addOn={props.addOn} /> */}
    </article>
  );
}

export default Appointment;