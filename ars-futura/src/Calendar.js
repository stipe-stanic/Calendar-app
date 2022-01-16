import React from "react";
import { useState, useEffect } from "react";
import { useAPIContext } from "./APIContext";

const Calendar = () => {
  const { addEvents, getEvents, deleteEvents } = useAPIContext();

  return (
    <div>
      <h2>List</h2>

      <button onClick={addEvents}>Add Event</button>
      <button onClick={getEvents}>Get Events</button>

      <button onClick={deleteEvents}>Delete Event</button>
    </div>
  );
};

export default Calendar;
