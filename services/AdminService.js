const Admin = require('../modals/AdminModal');
class AdminService {
    static async getAdmin(filter) {
        try{
            return await Admin.findOne(filter);
        }
        catch(error){
            throw new Error(error);
        }
    }

    static async addNewAdmin(body){
        try{
            const newAdmin = new Admin(body);
            return await newAdmin.save();
        }
        catch(error){
            throw new Error(error);
        }
    }

    static async updateToken(details){
        try{
            return await Admin.updateOne(
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
module.exports = AdminService;