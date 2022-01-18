import React from "react";
import Event from "./Event";
import { useAPIContext } from "./APIContext";

const Day = ({ value }) => {
  const { calendarEvents } = useAPIContext();

  return (
    <div className="event-height">
      <h2>{value}</h2>
      {calendarEvents.map((item) => {
        /* renders number of event components for each present day, sorts array based on day and start time of the event */
        calendarEvents.sort((a, b) => {
          if (a.day === b.day) {
            return a.startTimeNumber - b.startTimeNumber;
          } else {
            return a.day - b.day;
          }
        });
        if (item.day === value) return <Event key={item.id} {...item} />;
        return null;
      })}
    </div>
  );
};

export default Day;
