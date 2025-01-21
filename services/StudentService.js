const school = require('../modals/SchoolModal');
const StudentDetails = require('../modals/StudentModal');
class StudentService {
    static async getStudent(filter) {
        try{
            return await school.findOne(filter);
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async getStudentDetails(filter) {
        try{
            return await StudentDetails.findOne(filter);
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async addStudent(body) {
        try{
            const newStudent = new StudentDetails(body);
            return await newStudent.save();
        }
        catch(error){
            throw new Error(error);
        }
    }
    
    static async updateToken(details) {
        try{
            return await StudentDetails.updateOne(
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