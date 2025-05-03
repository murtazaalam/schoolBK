const TimeTableService = require('../services/TimeTableService');

class TimeTableController {
    static async addTimeTable(req, res) {
        try {

            const { className, time_table } = req.body;

            if ( !className || !time_table ) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Missing required fields",
                    data: {}
                });
            }

            const body = {
                school_id: req.school._id,
                class: className,
                time_table,
                created_by: req.school._id
            };

            const result = await TimeTableService.addTimeTable(body);

            return res.status(201).json({
                statusCode: 201,
                message: "Time table added successfully",
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Error: " + error.message,
                data: {}
            });
        }
    }

    static async getTimeTable(req, res) {
        try {
            const { school_id, class: className } = req.query;

            const filter = {};
            if (school_id) filter.school_id = school_id;
            if (className) filter.class = className;

            const data = await TimeTableService.getTimeTable(filter);

            return res.status(200).json({
                statusCode: 200,
                message: "Time table fetched successfully",
                data
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Error: " + error.message,
                data: {}
            });
        }
    }
}

module.exports = TimeTableController;