const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeTable = new Schema({
    school_id:{
        type: Schema.Types.ObjectId,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    time_table: {
        type: Array,
        required: true
    },

    updated_at:{
        type: Date,
        required: false
    },
    updated_by: {
        type: Schema.Types.ObjectId,
        required: false
    },
    created_at:{
        type: Date,
        default: new Date(),
    },
    created_by: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('time_table', TimeTable);
