import {http} from "../http-common";
import {toApiDateString} from "../../utils/DateUtils";
import {getDbInstance} from "../DbContext";

const DAY_HABITS_STORE_NAME = 'dayHabits';

class DayHabitsService {
    async syncCache() {
        const db = await getDbInstance();
        const dayHabits = await db.getAll(DAY_HABITS_STORE_NAME);
        for (const habit of dayHabits) {
            try {
                await http.post(`/habits/${habit.habitId}/status?childId=${habit.childId}&day=${toApiDateString(habit.day)}&status=${habit.status}`);

                await db.delete(DAY_HABITS_STORE_NAME, habit.id);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async setStatus(dayHabit, childId, status) {
        try {
            const db = await getDbInstance();

            let key = await db.put(DAY_HABITS_STORE_NAME, dayHabit);

            await http.post(`/habits/${dayHabit.habitId}/status?childId=${childId}&day=${toApiDateString(dayHabit.day)}&status=${status}`);

            await db.delete(DAY_HABITS_STORE_NAME, key);

            dayHabit.status = status;
            return dayHabit;
        } catch (err) {
            console.log(err);
            alert(err.message);
        }
    }
}

export default DayHabitsService;
