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