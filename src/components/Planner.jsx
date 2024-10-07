import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'; // Для интерактивных действий
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import GoogleCalendar from "../infrastructure/GoogleCalendar/GoogleCalendar";
import ruLocale from "@fullcalendar/core/locales/ru";
import {lightenRGB} from "../utils/ColorUtils";
import Deeds from "./Deeds";
import {useGoogleAuth} from "../infrastructure/GoogleCalendar/GoogleAuth";

const BLOCK_FOR_EVENT = "Семейные мероприятия";

const Planner = () => {
    const {refreshIsAuthenticated, isAuthenticated} = useGoogleAuth();
    const [isLoading, setIsLoading] = useState(true);

    const externalEventRef = useRef(null);
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
            disabled: false,
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
        }
    ]);

    useEffect(() => {
        refreshIsAuthenticated().finally(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        if(!isAuthenticated)
            return;

        //const calendars = await googleCalendar.getCalendars();
        loadColors().then();
    }, [isAuthenticated]);

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
                calendarTitle: calendar.title,
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

    useEffect(() => {
        // Настройка внешних элементов как перетаскиваемых
        new Draggable(externalEventRef.current, {
            itemSelector: '.card-item', // Селектор для перетаскиваемых элементов
            eventData: function (eventEl) {
                return {
                    title: eventEl.getElementsByClassName('title')[0].innerText,
                    type: eventEl.getElementsByClassName('deed-type')[0].value,
                };
            },
        });
    }, []);

    // Проверка на пересечение с существующими событиями
    const inBlock = (newEvent, blockName) => {
        return events.some((event) => {
            return (
                event.title === blockName && (event.display === 'background' || event.calendarTitle === 'TimeBlocking') &&
                newEvent.start.getTime() >= event.start.getTime() && newEvent.end.getTime() <= event.end.getTime()
            );
        });
    };

    // Проверка на пересечение с другими событиями
    const isOverlap = (newEvent) => {
        return events.some((event) => {
            return (
                event.id !== newEvent.id &&
                (event.display !== 'background' && event.calendarTitle !== 'TimeBlocking') &&
                (newEvent.start < new Date(event.end) && newEvent.end > new Date(event.start))
            );
        });
    }

    // Обработчик выбора диапазона времени
    const handleSelect = (selectInfo) => {
        const title = "новое событие"; // prompt('Введите название события:'); // Запрос названия события у пользователя
        const {start, end} = selectInfo; // Получаем время начала и окончания

        if (title) {
            const newEvent = {title, start, end};

            if (!isOverlap(newEvent)) {
                setEvents((prevEvents) => [
                    ...prevEvents,
                    {id: (prevEvents.length + 1).toString(), ...newEvent},
                ]);
            } else {
                //alert('Выбранное время пересекается с уже существующим событием!');
            }
        }

        // После добавления события, календарь обновляется
        // Нужно сбросить выбор
        selectInfo.view.calendar.unselect();
    };

    const handleEventDrop = (info) => {
        let canMove = false;
        // Обработка перетаскивания события (обновление времени начала и конца)
        const updatedEvents = events.map((event) => {
            if (event.id === info.event.id) {
                if ((info.event.extendedProps?.type !== 'Event' || inBlock(info.event, BLOCK_FOR_EVENT)) && !isOverlap(info.event)) {
                    canMove = true;
                    return {
                        ...event,
                        start: info.event.start,
                        end: info.event.end,
                    };
                }
            }

            return event;
        });
        if (!canMove)
            info.revert();
        setEvents(updatedEvents);
    };

    const handleEventResize = (info) => {
        let canMove = false;
        // Обработка изменения размера события (обновление времени конца)
        const updatedEvents = events.map((event) => {
            if (event.id === info.event.id) {
                if ((info.event.extendedProps?.type !== 'Event' || inBlock(info.event, BLOCK_FOR_EVENT)) && !isOverlap(info.event)) {
                    canMove = true;
                    return {
                        ...event,
                        start: info.event.start,
                        end: info.event.end,
                    };
                }
            }

            return event;
        });
        if (!canMove)
            info.revert();

        setEvents(updatedEvents);
    };

    const handleEventReceive = (info) => {
        let end = new Date(info.event.start);
        end.setTime(end.getTime() + 30 * 60 * 1000);
        const newEvent = {
            id: String(events.length + 1),
            title: info.event.title,
            start: info.event.start,
            end: end,
        };

        // Добавление нового события на основе внешнего элемента
        if ((info.event.extendedProps?.type !== 'Event' || inBlock(newEvent, BLOCK_FOR_EVENT)) && !isOverlap(newEvent)) {
            setEvents([...events, newEvent]);
        }

        // Удалить временное событие, созданное FullCalendar
        info.event.remove();
    };

    return (
        <div className='calendar-container' ref={externalEventRef}>
            <FullCalendar
                contentHeight='auto'
                plugins={[googleCalendarPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                slotMinTime="07:00:00"
                slotMaxTime="22:00:00"
                events={events}
                firstDay={1}
                locale={ruLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay,listWeek', // Добавлены виды для переключения
                }}
                nowIndicator={true}  // Включаем индикатор текущего времени
                selectable={true} // Позволяет выделять диапазоны времени
                select={handleSelect} // Устанавливаем обработчик выбора
                eventOverlap={true}
                editable={true} // Включить возможность перетаскивания и изменения размера
                eventDrop={handleEventDrop} // Обработчик для изменения положения события
                eventResize={handleEventResize} // Обработчик для изменения размера события
                droppable={true} // Разрешает перетаскивание с внешних источников
                eventReceive={handleEventReceive} // Обработчик для создания нового события
            />
            <a href='https://calendar.google.com/calendar/u/0/r/week'>Google Calendar</a>
            <div className='rewards'>
                <Deeds types={['Reward', 'GoodDeed']}/>
            </div>
            <style jsx="true">{`
              .calendar-container {
              }

              .rewards {
                margin-top: 1.5rem;
              }
            `}</style>
        </div>
    );
};

export default Planner;
