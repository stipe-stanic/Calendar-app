import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useAPIContext } from "../context/APIContext";

export default function Event({
  summary,
  end,
  start,
  id,
  endTime,
  startTime,
  date,
  day,
}) {
  const { calendarEvents, setCalendarEvents } = useGlobalContext();
  const { deleteEvents } = useAPIContext();

  /* filters array based on id and sends DELETE request to API*/
  const remove = (id) => {
    const results = calendarEvents.filter((eventItem) => eventItem.id !== id);
    deleteEvents(id);
    setCalendarEvents(results);
  };

  return (
    <article className="margin">
      <div>
        <p>{summary}</p>
      </div>
      <div>
        <p>{date}</p>
        {/* uses second prop if the first prop doesn't exist */}
        <h3>Start Time: {startTime || start.dateTime}</h3>
        <h4>End Time: {endTime || end.dateTime}</h4>
      </div>
      <button onClick={() => remove(id)}>Remove event</button>
    </article>
  );
}
