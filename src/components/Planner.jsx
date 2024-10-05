import React, {useEffect, useRef, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction'; // Для интерактивных действий
import googleCalendarPlugin from '@fullcalendar/google-calendar'

import ChildTasks from "./ChildTasks/ChildTasks";
import GoogleCalendar from "../core/Domain/GoogleCalendar";

const Planner = () => {
    const [events, setEvents] = useState([]);
    const externalEventRef = useRef(null);
    let googleCalendar = new GoogleCalendar();

    useEffect(() => {
        // Настройка внешних элементов как перетаскиваемых
        new Draggable(externalEventRef.current, {
            itemSelector: '.habit-item', // Селектор для перетаскиваемых элементов
            eventData: function (eventEl) {
                return {
                    title: eventEl.getElementsByClassName('item-title')[0].innerText,
                };
            },
        });
    }, []);

    useEffect(() => {
        loadEvents().then();
    }, []);

    const loadEvents = async () => {
        const googleEvents = await googleCalendar.getEvents();

        // Преобразование событий в формат, подходящий для FullCalendar
        const formattedEvents = googleEvents.filter(x => x.summary === 'Детские занятия').map((event) => ({
            id: event.id,
            title: event.summary,
            start: new Date(Date.parse(event.start.dateTime || event.start.date)),
            end: new Date(Date.parse(event.end.dateTime || event.end.date)),
            display: 'background', // Событие будет отображаться как фоновое
            backgroundColor: 'rgb(230, 124, 115)', // 'rgba(255, 0, 0, 0.2)', // Цвет для визуализации
        }));

        setEvents(formattedEvents);
    };

    // Проверка на пересечение с существующими событиями
    const inBlock = (newEvent, blockName) => {
        return events.some((event) => {
            return (
                event.title === blockName && event.display === 'background' &&
                newEvent.start.getTime() >= event.start.getTime() && newEvent.end.getTime() <= event.end.getTime()
            );
        });
    };

    // Проверка на пересечение с существующими событиями
    const isConflicting = (newEvent) => {
        return events.some((event) => {
            return (
                newEvent.start.getTime() < event.end.getTime() && newEvent.end.getTime() > event.start.getTime()
            );
        });
    };

    // Проверка на пересечение с другими событиями
    const isOverlap = (newEvent) => {
        return events.some((event) => {
            return (
                event.id !== newEvent.id &&
                event.display !== 'background' &&
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

            if (inBlock(newEvent, "Детские занятия") && !isOverlap(newEvent)) {
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
                if (inBlock(info.event, "Детские занятия") && !isOverlap(info.event)) {
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
                if (inBlock(info.event, "Детские занятия") && !isOverlap(info.event)) {
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
        let canMove = false;
        let end = new Date(info.event.start);
        end.setTime(end.getTime() + 30 * 60 * 1000);
        const newEvent = {
            id: String(events.length + 1),
            title: info.event.title,
            start: info.event.start,
            end: end,
        };

        // Добавление нового события на основе внешнего элемента
        if (inBlock(newEvent, "Детские занятия") && !isOverlap(newEvent)) {
            canMove = true;
            setEvents([...events, newEvent]);

            // Удалить временное событие, созданное FullCalendar

        }

        info.event.remove();
    };

    return (
        <div className='calendar-container' ref={externalEventRef}>
            <FullCalendar
                height={900}
                plugins={[googleCalendarPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                slotMinTime="07:00:00"
                slotMaxTime="22:00:00"
                events={events}
                selectable={true} // Позволяет выделять диапазоны времени
                select={handleSelect} // Устанавливаем обработчик выбора
                eventOverlap={true}
                editable={true} // Включить возможность перетаскивания и изменения размера
                eventDrop={handleEventDrop} // Обработчик для изменения положения события
                eventResize={handleEventResize} // Обработчик для изменения размера события
                droppable={true} // Разрешает перетаскивание с внешних источников
                eventReceive={handleEventReceive} // Обработчик для создания нового события
            />
            <ChildTasks/>
            <style jsx="true">{`
              .calendar-container {
              }
            `}</style>
        </div>
    );
};

export default Planner;
