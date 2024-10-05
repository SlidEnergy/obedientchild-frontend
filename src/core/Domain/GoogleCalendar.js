import axios from "axios";

const API_KEY = localStorage.getItem('googleApiKey');
const CALENDAR_ID = '11d2e536bf6abaf6fe3ef2644a141ae649caed1877fa388e4830a7b170fa0244@group.calendar.google.com';

class GoogleCalendar {
       getEvents = async () => {
        try {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDate = new Date(today); // Начальная дата
            startDate.setDate(today.getDate() - 7);
            const response = await axios.get(
                `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
                {
                    params: {
                        key: API_KEY,
                        timeMin: startDate.toISOString(), // Начало периода для получения событий
                        singleEvents: true,
                        orderBy: 'startTime',
                    },
                }
            );

            return response.data.items;
        } catch (error) {
            console.error('Ошибка при получении событий:', error);
            return [];
        }
    };

    getColors = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/calendar/v3/colors?key=${this.API_KEY}`);
            return response.data.items;
        } catch (error) {
            console.error('Ошибка при получении событий:', error);
            return [];
        }
    }
}

export default GoogleCalendar;
