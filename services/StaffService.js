const Staff = require('../modals/StaffModal');
class StaffService {
    
    static async getStaff(filter) {
        try{
            return await Staff.findOne(filter);
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async addStaff(body) {
        try{
            const newStaff = new Staff(body);           
            return await newStaff.save();
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async updateStaff(id,updateFields){
        try{
            return await Staff.updateOne({_id: id },{$set: updateFields});
        }
        catch(error){
            throw new Error(error);
        }

    }
    static async deleteStaff(id){
        try{
            return await Staff.deleteOne({_id: id});
        }
        catch(error){
            throw new Error(error)
        }
    }
    
    static async updateToken(details) {
        try{
            return await Staff.updateOne(
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
module.exports = StaffService;