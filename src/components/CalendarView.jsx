import React, {useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import GoogleCalendar from "../core/Domain/GoogleCalendar";


const CalendarView = () => {
    const [events, setEvents] = useState([]);
    let colors = ['rgb(158, 105, 175)', 'rgb(230, 124, 115)', 'rgb(244, 81, 30)'];

    let googleCalendar = new GoogleCalendar();

    useEffect(() => {
        loadEvents().then();
    }, []);

    const loadEvents = async () => {
        const googleEvents = await googleCalendar.getEvents();
        const colors = await googleCalendar.getColors();

        // Преобразование событий в формат, подходящий для FullCalendar
        const formattedEvents = googleEvents.map((event) => ({
            id: event.id,
            title: event.summary,
            start: new Date(Date.parse(event.start.dateTime || event.start.date)),
            end: new Date(Date.parse(event.end.dateTime || event.end.date)),
            display: 'background', // Событие будет отображаться как фоновое
            backgroundColor: 'rgb(230, 124, 115)', // 'rgba(255, 0, 0, 0.2)', // Цвет для визуализации
        }));

        setEvents(formattedEvents);
    };

    return (
        <div className='calendar-container'>
            <FullCalendar
                height={900}
                plugins={[googleCalendarPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                slotMinTime="07:00:00"
                slotMaxTime="22:00:00"
                events={events}
            />
            <style jsx="true">{`
              .calendar-container {
              }
            `}</style>
        </div>
    );
};

export default CalendarView;
