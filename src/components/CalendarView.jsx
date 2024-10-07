import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import ruLocale from '@fullcalendar/core/locales/ru';
import GoogleCalendar from "../infrastructure/GoogleCalendar/GoogleCalendar";
import {differenceInMinutes, formatDistanceToNow} from 'date-fns';
import {lightenRGB} from "../utils/ColorUtils";

const CalendarView = () => {
    let googleCalendar = new GoogleCalendar();

    const [events, setEvents] = useState([]);
    const [colors, setColors] = useState();
    const [calendars, setCalendars] = useState([
        {
            id: '11d2e536bf6abaf6fe3ef2644a141ae649caed1877fa388e4830a7b170fa0244@group.calendar.google.com',
            title: 'TimeBlocking',
            color: 'rgb(158, 105, 175)',
            textColor: '#fff',
            display: 'auto',
            classNames: [],
            hideInMonthAndList: true,
            disabled: false
        },
        {
            id: 'b273f85893d8bb01688ad11a512bdb734bea290b7dad29f6d454af0e4748656f@group.calendar.google.com',
            title: 'Детское расписание',
            color: lightenRGB('rgb(246, 191, 38)', 190),
            textColor: '#000',
            display: 'auto',
            classNames: [],
            hideInMonthAndList: true,
            disabled: false
        },
        {
            id: '6804e2d300379f914fd59135d987806514d99aafdd719d2b5cf0b829f9e153d6@group.calendar.google.com',
            title: 'MyLifeOrganized',
            color: 'rgb(11, 128, 67)',
            textColor: '#fff',
            display: 'auto',
            classNames: [],
            hideInMonthAndList: false,
            disabled: false
        }
    ]);

    useEffect(() => {
        //const calendars = await googleCalendar.getCalendars();
        loadColors().then();
    }, []);

    useEffect(() => {
        if (colors && calendars)
            loadEvents().then();
    }, [colors, calendars]);

    const loadColors = async () => {
        const colors = await googleCalendar.getColors();
        setColors(colors);
    }

    const loadEvents = async () => {
        const allEvents = [];
        for (const calendar of calendars) {
            if (calendar.disabled)
                continue;

            const googleEvents = await googleCalendar.getEvents(calendar.id);

            // Преобразование событий в формат, подходящий для FullCalendar
            const formattedEvents = googleEvents.map((event) => ({
                id: event.id,
                title: event.summary,
                start: new Date(Date.parse(event.start.dateTime || event.start.date)),
                end: new Date(Date.parse(event.end.dateTime || event.end.date)),
                display: calendar.display, // Событие будет отображаться как фоновое
                backgroundColor: event.colorId ? colors.event[event.colorId].background : calendar.color, // Цвет для визуализации
                textColor: event.colorId ? colors.event[event.colorId].foreground : calendar.textColor,
                classNames: calendar.classNames,
                allDay: Boolean(event.start.date),
                extendedProps: {
                    hideInMonthAndList: calendar.hideInMonthAndList, // Кастомное свойство для контроля видимости
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

    const calendarRef = useRef(null);

    const calcNextEvent = () => {
        if (events.length > 0) {
            const now = new Date();
            const upcomingEvents = events.filter(event => new Date(event.start) > now);

            if (upcomingEvents.length > 0) {
                const nextEvent = upcomingEvents.sort((a, b) => new Date(a.start) - new Date(b.start))[0];
                const timeUntilNextEvent = formatDistanceToNow(new Date(nextEvent.start), {addSuffix: true});
                return timeUntilNextEvent;
            }
        }
    };

    useEffect(() => {
        const attachLabelToNowIndicator = () => {
            // Ищем старую метку и удаляем её
            const oldLabel = document.querySelector('.custom-time-label');
            if (oldLabel) {
                oldLabel.remove();
            }

            let nextEventText = calcNextEvent();

            if (!nextEventText)
                return;

            const calendarEl = calendarRef.current?.getApi()?.el;
            if (calendarEl) {
                // Находим контейнер для текущего индикатора
                const nowIndicator = calendarEl.querySelector('.fc-timegrid-now-indicator-line');
                const nowIndicatorContainer = nowIndicator.parentElement;

                if (nowIndicator && nowIndicatorContainer) {
                    // Получаем позицию индикатора текущего времени
                    const nowIndicatorRect = nowIndicator.getBoundingClientRect();
                    const containerRect = nowIndicatorContainer.getBoundingClientRect();

                    const top = nowIndicatorRect.top - containerRect.top;
                    const left = nowIndicatorRect.left - containerRect.left;

                    // Создаем элемент для метки
                    const label = document.createElement('div');
                    label.className = 'custom-time-label';
                    label.innerText = nextEventText;
                    label.style.position = 'absolute';
                    label.style.top = `${top + 10}px`; // Смещение вниз от верхней части индикатора
                    label.style.left = `${left}px`; // Выравнивание по левому краю контейнера
                    label.style.background = '#fffae6';
                    label.style.padding = '5px 10px';
                    label.style.borderRadius = '5px';
                    label.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';
                    label.style.fontSize = '12px';
                    label.style.zIndex = 4;
                    label.style.display = 'none';

                    // Добавляем метку к контейнеру
                    nowIndicatorContainer.appendChild(label);
                }
            }
        };

        const calendarEl = calendarRef.current?.getApi()?.el;
        if (calendarEl) {
            // Находим контейнер для текущего индикатора
            const nowIndicator = calendarEl.querySelector('.fc-timegrid-now-indicator-line');

            if (nowIndicator) {
                // Добавление событий на ховер
                nowIndicator.addEventListener('mouseover', function () {
                    const label = document.querySelector('.custom-time-label');
                    if (label)
                        label.style.display = 'block';
                });

                nowIndicator.addEventListener('mouseout', function () {
                    const label = document.querySelector('.custom-time-label');
                    if (label)
                        label.style.display = 'none'; // Возвращение стандартного фона
                });
            }
        }

        // Вызываем функцию для добавления метки сразу после монтирования компонента
        attachLabelToNowIndicator();

        // Обновляем метку каждые 60 секунд, чтобы её положение корректировалось
        const intervalId = setInterval(attachLabelToNowIndicator, 60000);

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента

    }, [events]);

    // Функция для изменения видимости категории
    function toggleCalendar(calendar) {
        setCalendars(calendars =>
            calendars.map(x => ({
                ...x,
                disabled: x.id === calendar.id ? !x.disabled : x.disabled
            }))
        );
    }

    return (
        <div className='calendar-container'>
            <div>
                {calendars && calendars.map(calendar =>
                    <div key={calendar.id}>
                        <label htmlFor={calendar.id}>{calendar.title}</label>
                        <input type="checkbox" id={calendar.id} checked={!calendar.disabled}
                               onChange={() => toggleCalendar(calendar)}/>
                    </div>
                )}
            </div>
            <FullCalendar
                ref={calendarRef}
                contentHeight='auto' // Автоматическая высота в зависимости от содержимого
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
                nowIndicator={true}  // Включаем индикатор текущего времени
            />
            <a href='https://calendar.google.com/calendar/u/0/r/week'>Google Calendar</a>
            <style jsx="true">{`
              .calendar-container {
                position: relative;
              }

            `}</style>
        </div>
    );
};

export default CalendarView;
