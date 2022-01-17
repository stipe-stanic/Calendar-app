import React from "react";
import { useState } from "react";
import { useAPIContext } from "./APIContext";

const CreateEvent = () => {
  const {
    setCalendarEvents,
    calendarEvents,
    addEvents,
    createEvent,
    setCreateEvent,
  } = useAPIContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCreateEvent({ ...createEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      createEvent.summary &&
      createEvent.endTime &&
      createEvent.startTime &&
      createEvent.date
    ) {
      const newEvent = {
        ...createEvent,
        id: new Date().getTime().toString(),
        day: parseInt(createEvent.date.substr(8, 2)),
      };
      setCalendarEvents([...calendarEvents, newEvent]);

      addEvents(calendarEvents.id);
      setCreateEvent({ summary: "", date: "", startTime: "", endTime: "" });
    }
  };

  return (
    <div>
      <form>
        <p type="summary:">
          <input
            id="summary"
            name="summary"
            type="text"
            value={createEvent.summary}
            onChange={handleChange}
            placeholder="Title..."
          ></input>
        </p>
        <p type="Date:">
          <input
            id="date"
            name="date"
            type="text"
            value={createEvent.date}
            onChange={handleChange}
            placeholder="2022-01-20"
          ></input>
        </p>
        <p type="startTime:">
          <input
            id="startTime"
            name="startTime"
            value={createEvent.startTime}
            onChange={handleChange}
            type="text"
            placeholder="17:00:00"
          ></input>
        </p>
        <p type="endTime:">
          <input
            id="endTime"
            name="endTime"
            value={createEvent.endTime}
            onChange={handleChange}
            type="text"
            placeholder="19:00:00"
          ></input>
        </p>
        <button type="submit" onClick={handleSubmit}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
