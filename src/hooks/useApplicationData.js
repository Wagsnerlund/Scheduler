import {
  useState,
  useEffect
} from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [{
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          }
        }
      },
      {
        id: 3,
        time: "2pm",
        interview: {
          student: "Chelsea Wagner",
          interviewer: {
            id: 2,
            name: "Tori Malcom",
            avatar: "https://i.imgur.com/Nmx0Qxo.png",
          }
        }
      },
      {
        id: 4,
        time: "3pm",
        interview: {
          student: "Ryan Rice",
          interviewer: {
            id: 5,
            name: "Sven Jones",
            avatar: "https://i.imgur.com/twYrpay.jpg",
          }
        }
      },
      {
        id: 5,
        time: "4pm",
      }
    ],
    interviewers: []
  });

  //------------------------------------------

  const getSpotsForDay = function (dayObj, appointments) {

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  }

  const updateSpots = function (dayName, days, appointments) {

    // Find the day Object
    const dayObj = days.find(x => x.name === dayName);

    // calculate spots for this day
    const spots = getSpotsForDay(dayObj, appointments);

    const newDay = {
      ...dayObj,
      spots
    };

    const newDays = days.map(day => day.name === dayName ? newDay : day);

    return newDays;
  };

  //------------------------------------------

  function bookInterview(id, interview) {

    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: {
            ...interview
          }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(state.day, state.days, appointments);

        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(state.day, state.days, appointments);

        setState({
          ...state,
          appointments,
          days
        })

      });
  }



  const setDay = day => setState({
    ...state,
    day
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};