import React, { useContext, createContext, useEffect } from "react";
import { useGlobalContext } from "./GlobalContext";

const APIContext = createContext();

const APIProvider = ({ children }) => {
  const { createEvent, setCalendarEvents } = useGlobalContext();

  /* const values for connecting with the API */
  const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOCS = process.env.REACT_APP_DISCOVERY_DOCS;
  const SCOPES = process.env.REACT_APP_SCOPES;

  useEffect(() => {
    gapi.load("client:auth2", () => {
      // console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load(
        "calendar",
        "v3" /*, () => console.log("loaded calendar")*/
      );
    });
  }, [API_KEY, CLIENT_ID, gapi, SCOPES]);

  /* sends POST request to API, send request body with dynamic values, ---> id property gets overwritten when pulling data back <---  */
  const addEvents = (id) => {
    /* signs-in before sending request */
    // gapi.auth2
    //   .getAuthInstance()
    //   // .signIn()
    //   .then(() => {

    /* request body */
    const event = {
      summary: createEvent.summary,
      id: id,
      start: {
        dateTime: `${createEvent.date}T${createEvent.startTime}+01:00`,
        timeZone: "Europe/Zagreb",
      },
      end: {
        dateTime: `${createEvent.date}T${createEvent.endTime}+01:00`,
        timeZone: "Europe/Zagreb",
      },
    };

    /* POST the event */
    const request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    request.execute();

    /* opens a link to google calendar */
    // request.execute((event) => {
    //   window.open(event.htmlLink);
    // });
  };

  /* sends GET request to API and stores data in array of objects*/
  const getEvents = () => {
    /* request body */
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 15,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        // console.log("EVENTS: ", events);
        setCalendarEvents(events);
      });
  };

  /* sends DELETE request to API */
  const deleteEvents = (eventId) => {
    gapi.client.calendar.events
      .list({
        /* request body */
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then((response) => {
        // const events = response.result.items;
        // console.log("EVENTS: ", events);
        // console.log(events[0].id);
      });

    /* async function for deleting event */
    const deleteEvent = async (eventId) => {
      try {
        let response = await gapi.client.calendar.events.delete({
          calendarId: "primary",
          eventId: eventId,
        });

        if (response.data === "") {
          return 1;
        } else {
          return 0;
        }
      } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return 0;
      }
    };

    deleteEvent(eventId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <APIContext.Provider
      value={{
        addEvents,
        getEvents,
        deleteEvents,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPIContext = () => {
  return useContext(APIContext);
};

export { APIContext, APIProvider };
