const Teacher = require('../modals/TeacherModal');
class TeacherService {
    static async getTeacher(filter) {
        try{
            return await Teacher.findOne(filter);
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async getTeachersBySchool(schoolId) {
        try {
            return await Teacher.find({ school_id: schoolId });

        } catch (error) {
            throw new Error(error);
        }
    }
    
    static async addTeacher(body) {
        try{
            const newTeacher = new Teacher(body);           
            return await newTeacher.save();
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async updateTeacher(id, updateFields){
        try{
            return await Teacher.updateOne({_id: id }, {$set: updateFields});
        }
        catch(error){
            throw new Error(error);
        }

    }
    static async deleteTeacher(id){
        try{
            return await Teacher.deleteOne({_id: id});
        }
        catch(error){
            throw new Error(error)
        }
    }
    
    static async updateToken(details) {
        try{
            return await Teacher.updateOne(
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