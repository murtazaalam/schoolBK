const Student = require('../modals/StudentModal');
class StudentService {
    static async getStudent(filter) {
        try{
            return await Student.findOne(filter);
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async updateStudent(id, updateFields){
        try{
            return await Student.updateOne({_id: id }, {$set: updateFields});
        }
        catch(error){
            throw new Error(error);
        }
    
    }
    static async deleteStudent(id){
        try{
            return await Student.deleteOne({_id: id});
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async addStudent(body) {
        try{
            const newStudent = new Student(body);
            return await newStudent.save();
        }
        catch(error){
            throw new Error(error);
        }
    }
    
    static async updateToken(details) {
        try{
            return await Student.updateOne(
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
module.exports = StudentService;