const Staff = require('../modals/StaffModal');
class StaffService {
    
    static async getStaff(filter, projection = null) {
        try{
            const query = Staff.findOne(filter);
            if(projection){
                query.select(projection)
            }
            return await query;
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async getAllStaff(filter, sortKey, skip, limit){
        try{
            return await Staff.find(
                filter,
                ["-password", "-token"]
            ).sort(sortKey).skip(skip).limit(limit);
        }
        catch(error){
            throw new Error(error);
        }
    
    }
    static async getStaffsCount(filter) {
        try{
            return await Staff.aggregate([
                {$match: filter},
                {$count: 'totalCount'}
            ])
        }
        catch (error) {
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