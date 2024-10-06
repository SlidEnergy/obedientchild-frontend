import {googleApi} from "../google-api";

const API_KEY = localStorage.getItem('googleApiKey');
const CALENDAR_ID = '11d2e536bf6abaf6fe3ef2644a141ae649caed1877fa388e4830a7b170fa0244@group.calendar.google.com';

class GoogleCalendar {
       getEvents = async (calendarIds) => {
           let today = new Date();
           today.setHours(0, 0, 0, 0);
           const startDate = new Date(today); // Начальная дата
           startDate.setDate(today.getDate() - 7);

           const timeMin = startDate.toISOString(); // Начальная дата и время (текущая дата)
           const allEvents = [];

        try {
            // Перебираем все идентификаторы календарей
            for (const calendarId of calendarIds) {
                const response = await googleApi.get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
                    params: {
                        timeMin: timeMin,
                        singleEvents: false,
                        orderBy: 'startTime',
                    },
                });

                // Добавляем события из каждого календаря в общий массив
                allEvents.push(...response.data.items);
            }
        } catch (error) {
            console.error('Ошибка при получении событий:', error);
            return [];
        }
    };

    getColors = async () => {
        try {
            const response = await googleApi.get(`https://www.googleapis.com/calendar/v3/colors`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении событий:', error);
            return [];
        }
    }
}

export default GoogleCalendar;
