const school = require('../modals/SchoolModal');
const TeacherDetails = require('../modals/TeacherDetailsModel');
class TeacherService {
    static async getTeacherDetails(filter) {
        try{
            return await school.findOne(filter);
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async getTeacher(filter) {
        try{
            return await TeacherDetails.findOne(filter);
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async addTeacher(body) {
        try{
            const newTeacher = new TeacherDetails(body);
            return await newTeacher.save();
        }
        catch(error){
            throw new Error(error);
        }
    }
    
    static async updateToken(details) {
        try{
            return await TeacherDetails.updateOne(
                {_id: details._id},
                {
                    $set: {
                        "token": details.token
                    }
                }
            );
        }
        catch(error){
            throw new Error(error);
        }
    }
}
module.exports = TeacherService;