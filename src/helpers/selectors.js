export function getAppointmentsForDay(state, day) {
  let daysApptIDs = [];
  for (let d of state.days) {
    if (d.name === day) {
      daysApptIDs = d.appointments;
    }
  };
  if (daysApptIDs.length === 0) {
    return [];
  };
  let daysApptsDets = [];
  for (let appt of daysApptIDs) {
    daysApptsDets.push(state.appointments[appt])
  };
  return daysApptsDets;
};

export function getInterview(state, interview) {
  const interviewObj = {};
  if (interview === null) {
    return null;
  } else {
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[interview.interviewer];
  }
  return interviewObj;
};