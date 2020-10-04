export function getAppointmentsForDay(state, day) {
  let daysApptIDs = [];
  for (let d of state.days) {
    if (d.name === day) {
      daysApptIDs = d.appointments;
    }
  }
  if (daysApptIDs.length === 0) {
    return [];
  }
  let daysApptsDets = [];
  for (let appt of daysApptIDs) {
    daysApptsDets.push(state.appointments[appt]);
  }
  return daysApptsDets;
}

export function getInterviewersForDay(state, day) {
  let daysInterviewerIDs = [];
  for (let d of state.days) {
    if (d.name === day) {
      daysInterviewerIDs = d.interviewers;
    }
  }
  if (daysInterviewerIDs.length === 0) {
    return [];
  }
  let daysInterviewerDets = [];
  for (let itv of daysInterviewerIDs) {
    daysInterviewerDets.push(state.interviewers[itv]);
  }
  return daysInterviewerDets;
}

export function getInterview(state, interview) {
  const interviewObj = {};
  if (interview === null) {
    return null;
  } else {
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[interview.interviewer];
  }
  return interviewObj;
}
