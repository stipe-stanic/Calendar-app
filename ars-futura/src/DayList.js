import React from "react";
import { useAPIContext } from "./APIContext";
import Day from "./Day";

const DayList = () => {
  const { days } = useAPIContext();

  return (
    <section>
      <div>Days List</div>
      <div>
        {days.map((item) => {
          return <Day key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default DayList;
