import React from "react";

export default function DayListItem(props) {
  return (
    <li onClick={() => props.setDay(props.setDay)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}