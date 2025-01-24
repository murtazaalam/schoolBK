const bcrypt = require("bcryptjs");
const { jwtGenerator } = require("../utils/jwt");
const StaffService = require('../services/StaffService');

class StaffController {
    static async login(req, res){
        try{
            const { phone, email, password } = req.body;
            const lowerCaseEmail = email ? email.toLowerCase() : null;
            
            const data = await StaffService.getStaff({$or: [{email: lowerCaseEmail}, {phone}]});
            
            if(!data) return res.status(404).json({message: "Staff Not Found", data: {}, statusCode: 404});
            const isPasswordValid = bcrypt.compareSync(password, data.password);
            if(!isPasswordValid) return res.status(201).json({message:"Incorrect Password", statusCode: 201});
            
            const token = jwtGenerator({_id: data._id});
            await StaffService.updateToken({_id: data._id, token});
            const staff = {
                _id: data._id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                status: data.status,
                address: data.address,
                school_id: data.school_id,
                created_at: data.created_at,
                updated_at: data.updated_at
            }
            return res.status(200).json({message: "Login Success", data: staff, token, statusCode: 200});
        }
        catch(error){
            return res.status(400).json({statusCode: 400, message:"Error: "+error, data: {}});
        }
    }
}
module.exports = StaffController;