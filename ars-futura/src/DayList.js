import React from "react";
import { useAPIContext } from "./APIContext";
import Day from "./Day";

const DayList = () => {
  const {
    days,
    currentDate,
    setShowToday,
    showToday,
    // setShowMonth,
    // showMonth,
  } = useAPIContext();

  const toggleTodayView = () => {
    setShowToday(!showToday);
  };

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
            if (item.value > currentDate.sevenDaysFromToday) {
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
    </section>
  );
};

export default DayList;
