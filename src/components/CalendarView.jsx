import React, {useEffect, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import ruLocale from '@fullcalendar/core/locales/ru';
import GoogleCalendar from "../core/Domain/GoogleCalendar";

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [calendars, setCalendars] = useState({
        '11d2e536bf6abaf6fe3ef2644a141ae649caed1877fa388e4830a7b170fa0244@group.calendar.google.com':
            {
                title: 'TimeBlocking',
                color: 'rgb(158, 105, 175)',
                textColor: '#fff',
                display: 'auto',
                classNames: [],
                hideInMonthAndList: true
            },
        'b273f85893d8bb01688ad11a512bdb734bea290b7dad29f6d454af0e4748656f@group.calendar.google.com':
            {
                title: 'Детское расписание',
                color: lightenRGB('rgb(246, 191, 38)', 190),
                textColor: '#000',
                display: 'auto',
                classNames: [],
                hideInMonthAndList: true
            },
        '6804e2d300379f914fd59135d987806514d99aafdd719d2b5cf0b829f9e153d6@group.calendar.google.com':
            {
                title: 'MyLifeOrganized',
                color: 'rgb(11, 128, 67)',
                textColor: '#fff',
                display: 'auto',
                classNames: [],
                hideInMonthAndList: false
            }
    });

    function lightenRGB(rgb, factor) {
        // Разбиваем строку rgb на компоненты
        let [r, g, b] = rgb.match(/\d+/g).map(Number);

        // Увеличиваем каждую компоненту на заданный фактор, но не превышаем 255
        r = Math.min(255, r + factor);
        g = Math.min(255, g + factor);
        b = Math.min(255, b + factor);

        return `rgb(${r}, ${g}, ${b})`;
    }

    let googleCalendar = new GoogleCalendar();

    useEffect(() => {
        loadEvents().then();
    }, []);

    const loadEvents = async () => {
        //const calendarsG = await googleCalendar.getCalendars();
        const colors = await googleCalendar.getColors();
        const allEvents = [];
        for (const calendarId in calendars) {
            const googleEvents = await googleCalendar.getEvents(calendarId);

            // Преобразование событий в формат, подходящий для FullCalendar
            const formattedEvents = googleEvents.map((event) => ({
                id: event.id,
                title: event.summary,
                start: new Date(Date.parse(event.start.dateTime || event.start.date)),
                end: new Date(Date.parse(event.end.dateTime || event.end.date)),
                display: calendars[calendarId].display, // Событие будет отображаться как фоновое
                backgroundColor: event.colorId ? colors.event[event.colorId].background : calendars[calendarId].color, // Цвет для визуализации
                textColor: event.colorId ? colors.event[event.colorId].foreground : calendars[calendarId].textColor,
                classNames: calendars[calendarId].classNames,
                allDay: Boolean(event.start.date),
                extendedProps: {
                    hideInMonthAndList: calendars[calendarId].hideInMonthAndList, // Кастомное свойство для контроля видимости
                },
            }));

            allEvents.push(...formattedEvents);
        }

        setEvents(allEvents);
    };

    function eventDidMount(info) {
        const view = info.view.type;
        const hideInMonthAndList = info.event.extendedProps.hideInMonthAndList;

        // Если событие должно быть скрыто в месячном виде или в списке (повестке дня)
        if ((view === 'dayGridMonth' || view === 'listWeek') && hideInMonthAndList) {
            info.el.style.display = 'none';
        }
    }

    return (
        <div className='calendar-container'>
            <FullCalendar
                height={900}
                plugins={[googleCalendarPlugin, timeGridPlugin, dayGridPlugin, listPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                slotMinTime="07:00:00"
                slotMaxTime="22:00:00"
                events={events}
                firstDay={1}
                locale={ruLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', // Добавлены виды для переключения
                }}
                eventDidMount={eventDidMount}
            />
            <a href='https://calendar.google.com/calendar/u/0/r/week'>Google Calendar</a>
            <style jsx="true">{`
              .calendar-container {
              }

            `}</style>
        </div>
    );
};

export default CalendarView;
