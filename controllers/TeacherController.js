const bcrypt = require("bcryptjs");
const { jwtGenerator } = require("../utils/jwt");
const TeacherService = require('../services/TeacherService');

class TeacherController {
    static async login(req, res){
        const { phone, email, password } = req.body;
        const data = await TeacherService.getTeacher({$or: [{phone, email}]});
        if(!data) return res.status(404).json({message: "School Not Found", data: {}, statusCode: 404});
        const isPasswordValid = bcrypt.compareSync(password, data.password);
        if(!isPasswordValid) return res.status(201).json({message:"Incorrect Password", statusCode: 201});
        const token = jwtGenerator({_id: data._id});
        await TeacherService.updateToken({_id: data._id, token});
        const school = {
            _id: data._id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            status: data.status,
            address: data.address,
            created_at: data.created_at
        }
        return res.status(200).json({message: "Login Success", data: school, token, statusCode: 200});
    }
}
module.exports = TeacherController;