import {openDB} from 'idb';
import {http} from "../http-common";
import {toApiDateString} from "../../utils/DateUtils";

const DAY_HABITS_STORE_NAME = 'dayHabits';
const DATABASE_NAME = 'app-db';

class DayHabitsService {
    db = null;
    initialized = false;

    async init() {
        if (this.initialized) {
            return; // Если база данных уже инициализирована, просто выходим
        }
        try {
            this.db = await openDB(DATABASE_NAME, 1, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains(DAY_HABITS_STORE_NAME)) {
                        db.createObjectStore(DAY_HABITS_STORE_NAME, {autoIncrement: true});
                    }
                },
            });

            this.initialized = true; // Устанавливаем флаг инициализации
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }

    async syncCache() {
        await this.init();

        const dayHabits = await this.db.getAll(DAY_HABITS_STORE_NAME);
        for (const habit of dayHabits) {
            try {
                await http.post(`/habits/${habit.habitId}/status?childId=${habit.childId}&day=${toApiDateString(habit.day)}&status=${habit.status}`);

                await this.db.delete(DAY_HABITS_STORE_NAME, habit.id);
            } catch (err) {
                console.log(err);
                alert(err.message);
            }
        }
    }

    async setStatus(dayHabit, childId, status) {
        await this.init();

        try {
            let key = await this.db.put(DAY_HABITS_STORE_NAME, dayHabit);

            await http.post(`/habits/${dayHabit.habitId}/status?childId=${childId}&day=${toApiDateString(dayHabit.day)}&status=${status}`);

            await this.db.delete(DAY_HABITS_STORE_NAME, key);

            dayHabit.status = status;
            return dayHabit;
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }
}

export default DayHabitsService;
