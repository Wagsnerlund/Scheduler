import React from 'react';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Saving from "components/Appointment/Saving";
import Deleting from "components/Appointment/Deleting";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import "components/Application"
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteAppt() {
    transition(DELETE, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article
      className="appointment"
      data-testid="appointment">

      <Header
        time={props.time}
      />
      {mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Saving message="Saving" />}
      {mode === DELETE && <Deleting message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={deleteAppt}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save} />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment."
          onClose={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not cancel appointment."
          onClose={() => transition(SHOW)}
        />
      )}
    </article>
  )
}
