import React from "react";
import { useEffect } from "react";
import { useAPIContext } from "./APIContext";
import CreateEvent from "./CreateEvent";
import DayList from "./DayList";
// import EventList from "./EventList";

const Calendar = () => {
  const {
    getEvents,
    calendarEvents,
    setCalendarEvents,
    setDays,
    setCurrentDate,
    days,
    currentDate,
  } = useAPIContext();

  /* retrieves the data if it's stored in local storage */
  useEffect(() => {
    if (localStorage.getItem("event")) {
      let temp = JSON.parse(localStorage.getItem("event"));
      setCalendarEvents(temp);
    }
  }, [setCalendarEvents]);

  /* stores new data to the local storage on every change */
  useEffect(() => {
    localStorage.setItem("event", JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  /* stores usable values in new properties, splits the strings when pulling data from API or creating new event */
  if (calendarEvents.length > 0) {
    calendarEvents.forEach((item) => {
      if (item.start) {
        let day = parseInt(item.start.dateTime.substr(8, 2));
        let startTimeNumber = parseInt(item.start.dateTime.substr(11, 2));
        let date = item.start.dateTime.substr(0, 10);
        let startTime = item.start.dateTime.substr(11, 8);
        let endTime = item.end.dateTime.substr(11, 8);

        item.day = day;
        item.startTimeNumber = startTimeNumber;
        item.date = date;
        item.startTime = startTime;
        item.endTime = endTime;
      }
    });
  }

  /* When adding new event, adds new object to 'days' array, if it has same
  property value of a another object (in the 'days' array), it gets deleted. Returns only unique values */
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

  useEffect(() => {
    /* Getting a date 0, 7, 30 days from now */
    let date7Days = new Date();
    date7Days.setDate(date7Days.getDate() + 7);

    let dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 0);

    let date30Days = new Date();
    date30Days.setDate(date30Days.getDate() + 30);

    /* integer value of current day + 7, + 0, + 30 */
    let date7DaysInt = date7Days.getDate();
    let dateTodayInt = dateToday.getDate();
    let date30DaysInt = date30Days.getDate();

    /* assigns values to properties */
    setCurrentDate({
      sevenDaysFromToday: date7DaysInt,
      today: dateTodayInt,
      thirtyDaysFromToday: date30DaysInt,
    });
  }, [calendarEvents, setCurrentDate]);

  useEffect(() => {
    console.log(currentDate);
  }, [currentDate]);

  /* console log for 'days' array */

  useEffect(() => {
    if (days.length > 0) {
      console.log("DAYS: ", days);
    }
  }, [days]);

  /* console log for 'events' array */

  useEffect(() => {
    console.log("STATE: ", calendarEvents);
  }, [calendarEvents]);

  return (
    <div className="center">
      <h2>List</h2>
      <div>
        <button onClick={getEvents}>Get Events</button>
      </div>
      <div className="flexbox">
        {/* <EventList /> */}
        <DayList />
        <CreateEvent />
      </div>
    </div>
  );
};

export default Calendar;
