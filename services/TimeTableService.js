const TimeTable = require('../modals/TimeTableModals');

class TimeTableService {
    static async getTimeTable(filter) {
        try {
            return await TimeTable.find(filter);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async addTimeTable(body) {
        try {
            const newTimeTable = new TimeTable(body);
            return await newTimeTable.save();
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = TimeTableService;
