import {googleApi} from "./google-api";

const get = async (url, config) => {
    try {
        let response = await googleApi.get(url, config);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`Ошибка ${error.response.status}: ${error.response.statusText}`);
        } else {
            console.error(error);
        }
    }
}

class GoogleCalendar {
    getCalendars = async () => {
        return await get(`https://www.googleapis.com/calendar/v3/users/me/calendarList`);
    };

    getEvents = async (calendarId) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        const startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Начальная дата
        const endDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));

        const timeMin = startDate.toISOString(); // Начальная дата и время (текущая дата)
        const timeMax = endDate.toISOString(); // Начальная дата и время (текущая дата)

        const response = await get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
            params: {
                timeMin: timeMin,
                timeMax: timeMax,
                singleEvents: true,
                maxResults: 250,
                orderBy: 'startTime',
            },
        });

        // Добавляем события из каждого календаря в общий массив
        return response.items;
    };

    getColors = async () => {
        return get(`https://www.googleapis.com/calendar/v3/colors`);
    }
}

export default GoogleCalendar;
