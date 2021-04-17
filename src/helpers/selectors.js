export function getAppointmentsForDay(state, day) {
  let appts = [];
  const ids = state.days.filter(x => x.name === day);
  if (ids && ids.length > 0) {
    const ids2 = ids[0].appointments;
    for (let i = 0; i < ids2.length; i++) {
      appts.push(state.appointments[ids2[i]]);
    }
  }
  return appts;
}

export function getInterviewersForDay(state, day) {
  let appts = [];
  const dayObj = state.days.find(x => x.name === day);

  if (!dayObj || !dayObj.interviewers.length) {
    return [];
  }

  for (const id of dayObj.interviewers) {
    const interviewer = state.interviewers[id];
    appts.push(interviewer);
  }
  return appts;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const { id, name, avatar } = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: { id: id, name: name, avatar: avatar }
  }
}
