import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const daysListed = props.days;
  console.log(daysListed)
  return (
    <ul>
      {daysListed.map(day => {
        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={props.setDay} />
        );
      })}
    </ul>
  );
}

