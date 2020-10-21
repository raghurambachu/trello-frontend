import React, { useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import "react-calendar/dist/Calendar.css";
import Button from "../utils/Button";

function getShortDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = date.getFullYear();
  date = mm + "/" + dd + "/" + yyyy;
  return date;
}

function DueDate() {
  const [dueDate, setDueDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  return (
    <div className="w-full p-4 text-gray-700 rounded-md shadow-lg">
      <div className="due-date-header">
        <h3 className="font-bold text-center">Change Due Date</h3>
        <div className="flex space-x-4 ">
          <div className="w-1/2">
            <span className="text-sm font-bold">Date</span>
            <p className="px-2 py-1 font-bold bg-gray-300 border-2 border-gray-800 rounded-md">
              {getShortDate(dueDate)}
            </p>
          </div>
          <div className="w-1/2">
            <span className="text-sm font-bold">Time</span>
            <div>
              <TimePicker
                className="inline-block py-2"
                clearIcon={null}
                clockIcon={null}
                onChange={(time) => setTime(time)}
                value={time}
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <Calendar
            className="rounded-md"
            onChange={(date) => setDueDate(date)}
            value={dueDate}
          />
        </div>

        <div className="flex justify-between my-4">
          <Button name="Save" color={"green"} base={500} />
          <Button name="Delete" color={"red"} base={500} />
        </div>
      </div>
    </div>
  );
}

export default DueDate;
