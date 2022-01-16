import React from "react";
import { useAPIContext } from "./APIContext";

export default function Event({
  summary,
  end,
  start,
  id,
  endTime,
  startTime,
  date,
}) {
  const { calendarEvents, setCalendarEvents, deleteEvents } = useAPIContext();

  const remove = (id) => {
    const results = calendarEvents.filter((eventItem) => eventItem.id !== id);
    deleteEvents(id);
    setCalendarEvents(results);
  };

  return (
    <article>
      <div>
        <p>{summary}</p>
      </div>
      <div>
        <p>{date}</p>
        <h3>Start Time: {startTime || start.dateTime}</h3>
        <h4>End Time: {endTime || end.dateTime}</h4>
      </div>
      <button onClick={() => remove(id)}>Remove item</button>
      <hr />
    </article>
  );
}
