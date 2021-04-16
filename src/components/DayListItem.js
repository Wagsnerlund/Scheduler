import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayList = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': (props.spots === 0)
  }
  );

  const formatSpots = function () {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  };

  return (
    <li className={dayList} onClick={() => props.setDay(props.name)} >
      <div className="text--regular">{props.name}</div>
      <div className="text--light">{formatSpots(props.spots)}</div>
    </li>
  );
}
