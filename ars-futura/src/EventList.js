import React from "react";
import { useAPIContext } from "./APIContext";
import Event from "./Event";

export default function EventList() {
  const { calendarEvents } = useAPIContext();

  return (
    <section className="event-width">
      <h2>Events</h2>
      <hr />
      <div>
        {calendarEvents.map((item) => {
          calendarEvents.sort((a, b) => {
            return a.day - b.day;
          });
          return <Event key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
