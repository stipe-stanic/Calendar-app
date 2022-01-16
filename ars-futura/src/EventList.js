import React from "react";
import { useAPIContext } from "./APIContext";
import Event from "./Event";

export default function EventList() {
  const { calendarEvents } = useAPIContext();

  return (
    <section>
      <h2>Events</h2>
      <hr />
      <div>
        {calendarEvents.map((item) => {
          return <Event key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
