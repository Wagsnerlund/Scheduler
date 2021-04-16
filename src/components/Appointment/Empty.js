import React from "react";

// {mode === EMPTY && <Empty onAdd={() => CREATE} />}
// {mode === CREATE && (
//   <Create
//     student={props.interview.student}
//     interviewer={props.interview.interviewer}
//   />

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  )
}