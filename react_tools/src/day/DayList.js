import React, { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import Day from "./Day";

const DayList = () => {
  const {
    days,
    currentDate,
    setShowToday,
    showToday,
    setIsEventsToday,
    isEventsToday,
    calendarEvents,
    // setShowMonth,
    // showMonth,
  } = useGlobalContext();

  const toggleTodayView = () => {
    setShowToday(!showToday);
  };

  useEffect(() => {
    for (let i = 0; i < calendarEvents.length; i++) {
      if (calendarEvents[i].day === currentDate.today) {
        setIsEventsToday(true);
      }
    }
  }, [calendarEvents, setIsEventsToday, currentDate.today]);

  /* display functionality for the events in next 30 days*/

  // const toggleMonthView = () => {
  //   setShowMonth(!showMonth);
  // };

  return (
    <section className="event-width">
      <h2>Days List</h2>
      <button onClick={toggleTodayView}>
        {showToday && "Show week"}
        {!showToday && "Show today"}
      </button>
      <hr />
      {/* <button onClick={toggleMonthView}>Show month</button> */}
      <div>
        {days.map((item) => {
          /* renders all events in next seven days */
          if (!showToday) {
            if (
              item.value > currentDate.sevenDaysFromToday ||
              item.value < currentDate.today
            ) {
              return null;
            }
            return (
              <div key={item.id}>
                <Day {...item} />
                <hr />
              </div>
            );
            /* renders all events in the current day */
          } else if (showToday) {
            if (item.value === currentDate.today) {
              return <Day key={item.id} {...item} />;
            }
            return null;
          }
          return null;
        })}
      </div>
      {!isEventsToday && showToday && <h2>No events today!</h2>}
    </section>
  );
};

export default DayList;
