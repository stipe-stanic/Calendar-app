import React from "react";
import { useState, useEffect } from "react";
import { useAPIContext } from "./APIContext";
import CreateEvent from "./CreateEvent";
import EventList from "./EventList";

const Calendar = () => {
  const {
    addEvents,
    getEvents,
    deleteEvents,
    calendarEvents,
    setCalendarEvents,
  } = useAPIContext();

  useEffect(() => {
    if (localStorage.getItem("event")) {
      let temp = JSON.parse(localStorage.getItem("event"));
      setCalendarEvents(temp);
    }
  }, [setCalendarEvents]);

  useEffect(() => {
    localStorage.setItem("event", JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  return (
    <div>
      <h2>List</h2>
      <button onClick={addEvents}>Add Event</button>
      <button onClick={getEvents}>Get Events</button>
      <button onClick={deleteEvents}>Delete Event</button>
      <EventList />
      <CreateEvent />
    </div>
  );
};

export default Calendar;
