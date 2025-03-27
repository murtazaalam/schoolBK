const User = require('../modals/UserModal');
class UserService {
    static async getUser(filter, projection = null) {
        try{
            const query = User.findOne(filter);
            if(projection){
                query.select(projection)
            }
            return await query;
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async getAllUser(filter, sortKey, skip, limit) {
        try{
            return await User.find(
                filter,
                ["-password", "-token"]
            ).sort(sortKey).skip(skip).limit(limit);
        }
        catch (error) {
            throw new Error(error);
        }
    }

    static async getUserCount(filter) {
        try{
            return await User.aggregate([
                {$match: filter},
                {$count: 'totalCount'}
            ])
        }
        catch (error) {
            throw new Error(error);
        }
    }
    
    static async addUser(body) {
        try{
            const newUser = new User(body);           
            return await newUser.save();
        }
        catch(error){
            throw new Error(error);
        }
    }
    static async updateUser(id, updateFields){
        try{
            return await User.updateOne({_id: id }, {$set: updateFields});
        }
        catch(error){
            throw new Error(error);
        }

    }
    static async deleteUser(id){
        try{
            return await User.deleteOne({_id: id});
        }
        catch(error){
            throw new Error(error)
        }
    }
    
    static async updateToken(details) {
        try{
            return await User.updateOne(
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
module.exports = UserService;