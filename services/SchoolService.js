const School = require('../modals/SchoolModal');

class SchoolService {
    static async getSchool(filter) {
        try{
            return await School.findOne(filter);
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async addSchool(body) {
        try{
            const newSchool = new School(body);
            return await newSchool.save();
        }
        catch(error){
            throw new Error(error);
        }
    }
    
    static async updateToken(details) {
        try{
            return await School.updateOne(
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
module.exports = SchoolService;