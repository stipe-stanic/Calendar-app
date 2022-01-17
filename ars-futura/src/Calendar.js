import React from "react";
import { useState, useEffect, useRef } from "react";
import { useAPIContext } from "./APIContext";
import CreateEvent from "./CreateEvent";
import DayList from "./DayList";
import EventList from "./EventList";

const Calendar = () => {
  const {
    addEvents,
    getEvents,
    deleteEvents,
    calendarEvents,
    setCalendarEvents,
    setDays,
    days,
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

  if (calendarEvents.length > 0) {
    calendarEvents.forEach((item) => {
      if (item.start) {
        let day = parseInt(item.start.dateTime.substr(8, 2));
        let date = item.start.dateTime.substr(0, 10);
        let startTime = item.start.dateTime.substr(11, 8);
        let endTime = item.end.dateTime.substr(11, 8);

        item.day = day;
        item.date = date;
        item.startTime = startTime;
        item.endTime = endTime;
      }
    });
  }

  /*When adding new event, adds new object to days array, if it has same
  property value of a another object (in the days array), it gets deleted. Returns only unique values(number of days)*/
  useEffect(() => {
    let unique = [];
    let arrDays = [];

    arrDays = calendarEvents.map((item, index) => {
      let tempObj = {
        value: item.day,
        id: index + 1,
      };
      return tempObj;
    });

    arrDays.map((x) =>
      unique.filter((a) => a.value === x.value).length > 0
        ? null
        : unique.push(x)
    );

    setDays(unique);
  }, [calendarEvents, setDays]);

  // useEffect(() => {
  //   let unique = [];
  //   days.map((x) =>
  //     unique.filter((a) => a.value === x.value).length > 0
  //       ? null
  //       : unique.push(x)
  //   );
  //   console.log(unique);
  // }, [days]);

  useEffect(() => {
    console.log("DAYS: ", days);
  }, [days]);

  useEffect(() => {
    console.log("STATE: ", calendarEvents);
  }, [calendarEvents]);

  return (
    <div className="center">
      <h2>List</h2>
      <div>
        <button onClick={addEvents}>Add Event</button>
        <button onClick={getEvents}>Get Events</button>
        <button onClick={deleteEvents}>Delete Event</button>
      </div>
      <div className="flexbox">
        <EventList />
        <CreateEvent />
        <DayList />
      </div>
    </div>
  );
};

export default Calendar;
