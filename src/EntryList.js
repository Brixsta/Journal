import React from "react";
import { BsXLg } from "react-icons/bs";
import EntryText from "./EntryText";

const EntryList = ({ entries, onDelete }) => {
  if (!entries || entries.length === 0) {
    return;
  }

  return (
    <ul className="entry-list">
      {entries.map((item) => {
        const timestamp = new Date(item.TS);

        // Format the timestamp to a readable format
        const formattedTimestamp = timestamp.toLocaleString("en-US", {
          weekday: "long", // Full weekday name (e.g., "Monday")
          year: "numeric", // Full year (e.g., "2025")
          month: "long", // Full month name (e.g., "March")
          day: "numeric", // Day of the month (e.g., "23")
          hour: "2-digit", // Hour in 12-hour format
          minute: "2-digit", // Minute
          second: "2-digit", // Second
          hour12: true, // AM/PM format
        });

        return (
          <li className="entry" key={item.ID}>
            <div className="timestamp">{formattedTimestamp}</div>
            <br />
            <EntryText item={item.Entry} />
            <BsXLg className="x-delete" onClick={() => onDelete(item.ID)} />
          </li>
        );
      })}
    </ul>
  );
};

export default EntryList;
