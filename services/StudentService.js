const Student = require('../modals/StudentModal');
class StudentService {
    static async getStudent(filter, projection = null) {
        try{
            const query = Student.findOne(filter);
            if(projection){
                query.select(projection)
            }
            return await query;
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async getAllStudent(filter,sortKey,limit,skip){
        try{
            return await Student.find(
                filter,
                ["-password", "-token"]
            ).sort(sortKey).skip(skip).limit(limit);
        }
        catch(error){
            throw new Error(error);
        }

    }
    static async getStudentCount(filter) {
        try{
            return await Student.aggregate([
                {$match: filter},
                {$count: 'totalCount'}
            ])
        }
        catch (error) {
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