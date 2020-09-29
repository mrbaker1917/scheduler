import React from 'react';
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

const InterviewerList = (props) => {
  const interviewersListed = props.interviewers;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewersListed.map(interviewer => {
          return (
            <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === props.interviewer}
              setInterviewer={event => props.setInterviewer(interviewer.id)} />
          )
        })}
      </ul>
    </section>
  );
};

export default InterviewerList;