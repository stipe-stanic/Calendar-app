/* Display events in order */

// import React from "react";
// import { useGlobalContext } from "../context/GlobalContext";
// import Event from "./event/Event";

// export default function EventList() {
//   const { calendarEvents } = useGlobalContext();

//   return (
//     <section className="event-width />
//       <h2>Events</h2>
//       <hr />
//       <div>
//         {calendarEvents.map((item) => {
//           calendarEvents.sort((a, b) => {
//             if (a.day === b.day) {
//               return a.startTimeNumber - b.startTimeNumber;
//             } else {
//               return a.day - b.day;
//             }
//           });
//           return <Event key={item.id} {...item} />;
//         })}
//       </div>
//     </section>
//   );
// }
