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
  let interviewers = [];
  const dayObj = state.days.find(x => x.name === day);
  if (!dayObj || !dayObj.interviewers.length) {
    return [];
  }
  console.log(dayObj.interviewers);
  for (const id of dayObj.interviewers) {
    const interviewer = state.interviewers[id];
    interviewers.push(interviewer);
  }
  return interviewers;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const {
    id,
    name,
    avatar
  } = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: {
      id: id,
      name: name,
      avatar: avatar
    }
  }
}


const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};


getInterviewersForDay(state, "Tuesday");