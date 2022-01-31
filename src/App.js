import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import Modal from "./components/Modal";

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

function App() {
    const [allEvents, setEvents] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(['', '', ''])

    const tadam = (event) => {
      setSelectedItem([event.title, event.description, event.id]);
      setIsOpen(true)
      return true;
    }
    const getEvents = async () => {
        fetch("https://api.airtable.com/v0/appD9YFLSX3Kflhy6/Events?api_key=keyhPyeleDSLqACg1")
          .then((res) => res.json())
          .then((data) => {
            setEvents(data.records.map((record) => {
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
      };

      useEffect(() => {
        const timer = setInterval(getEvents, 2000);
        return () => clearInterval(timer);
      }, []);

    return (
        <div className="App">
            <h1>Calendar</h1>
            <h2>Airtable + React</h2>
            <div>
              {/* <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
                Open Modal
              </button> */}
              {selectedItem.id}
              {isOpen && <Modal selectedItem={selectedItem} setIsOpen={setIsOpen} />}
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" onSelectEvent={event => tadam(event)} endAccessor="end" style={{ height: 700, margin: "50px" }} />
        </div>
    );
}

export default App;
