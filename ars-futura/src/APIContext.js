import React, { useContext, createContext, useState, useEffect } from "react";

const APIContext = createContext();

const APIProvider = ({ children }) => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [days, setDays] = useState([]);
  const [createEvent, setCreateEvent] = useState({
    summary: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  var gapi = window.gapi;
  var CLIENT_ID =
    "747061863296-f2hb1umn9dbp2lbmp27d5ac2mfmba3f3.apps.googleusercontent.com";
  var API_KEY = "AIzaSyAaNGo9QtR-7G8wNlY6mVv6yi-PSvVMb3s";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  var SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const addEvents = (id) => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("loaded calendar"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: createEvent.summary,
            location: "800 Howard St., San Francisco, CA 94103",
            description:
              "A chance to hear more about Google's developer products.",
            eventId: id,
            start: {
              dateTime: `${createEvent.date}T${createEvent.startTime}+01:00`,
              timeZone: "Europe/Zagreb",
            },
            end: {
              dateTime: `${createEvent.date}T${createEvent.endTime}+01:00`,
              timeZone: "Europe/Zagreb",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
            attendees: [
              { email: "lpage@example.com" },
              { email: "sbrin@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };

          //POST the event
          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            window.open(event.htmlLink);
          });
        });
    });
  };

  const getEvents = () => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("loaded calendar"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              console.log("EVENTS: ", events);
              setCalendarEvents(events);
            });
        });
    });
  };

  const deleteEvents = (eventId) => {
    gapi.load("client:auth2", () => {
      console.log("loaded client");

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3", () => console.log("loaded calendar"));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          gapi.client.calendar.events
            .list({
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
        });
    });
  };

  return (
    <APIContext.Provider
      value={{
        addEvents,
        getEvents,
        deleteEvents,
        calendarEvents,
        setCalendarEvents,
        createEvent,
        setCreateEvent,
        days,
        setDays,
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
