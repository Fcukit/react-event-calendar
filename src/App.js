import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Recipes from "./Recipes";

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [];

function App() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    useEffect(() => {
        fetch("https://api.airtable.com/v0/appD9YFLSX3Kflhy6/Events?api_key=keyhPyeleDSLqACg1")
          .then((res) => res.json())
          .then((data) => {
            setAllEvents(data.records.map((record) => {
                var offset = new Date().getTimezoneOffset();
                return {
                    title: record.fields.Title,
                    description: record.fields.Description,
                    allDay: false,
                    start: new Date(new Date(record.fields.Start).getTime() - offset * 60 * 1000),
                    end: new Date(new Date(record.fields.End).getTime() - offset * 60 * 1000),
                    id: record.id
                }
            }));
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);


    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
    }

    return (
        <div className="App">
            <h1>Calendar</h1>
            <h2>Airtable + React</h2>
            <div>
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" onSelectEvent={event => alert(event.description)} endAccessor="end" style={{ height: 700, margin: "50px" }} />
        </div>
    );
}

export default App;
