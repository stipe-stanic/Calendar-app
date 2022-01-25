import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [days, setDays] = useState([]);

  const [showToday, setShowToday] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [isEventsToday, setIsEventsToday] = useState(false);

  const [currentDate, setCurrentDate] = useState({
    today: "",
    sevenDaysFromToday: "",
    thirtyDaysFromToday: "",
  });

  const [createEvent, setCreateEvent] = useState({
    summary: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  return (
    <GlobalContext.Provider
      value={{
        calendarEvents,
        setCalendarEvents,
        createEvent,
        setCreateEvent,
        days,
        setDays,
        currentDate,
        setCurrentDate,
        setShowToday,
        showToday,
        showMonth,
        setShowMonth,
        isEventsToday,
        setIsEventsToday,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalProvider };
