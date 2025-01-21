const bcrypt = require("bcryptjs");
const { jwtGenerator } = require("../utils/jwt");
const StudentService = require('../services/StudentService');

class StudentController {
    static async login(req, res){
        const { phone, email, password } = req.body;
        const data = await StudentService.getStudent({$or: [{phone, email}]});
        if(!data) return res.status(404).json({message: "Student Not Found", data: {}, statusCode: 404});
        const isPasswordValid = bcrypt.compareSync(password, data.password);
        if(!isPasswordValid) return res.status(201).json({message:"Incorrect Password", statusCode: 201});
        const token = jwtGenerator({_id: data._id});
        await StudentService.updateToken({_id: data._id, token});
        const Student = {
            _id: data._id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            status: data.status,
            address: data.address,
            created_at: data.created_at
        }
        return res.status(200).json({message: "Login Success", data: Student, token, statusCode: 200});
    }
}
module.exports = StudentController;