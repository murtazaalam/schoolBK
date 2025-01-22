const bcrypt = require("bcryptjs");
const { jwtGenerator } = require("../utils/jwt");
const StudentService = require('../services/StudentService');

class StudentController {
    static async login(req, res){
        const { phone, email, password } = req.body;
        const lowerCaseEmail = email ? email.toLowerCase() : null;
        const data = await StudentService.getStudent({$or: [{email: lowerCaseEmail}, {phone}]});
        if(!data) return res.status(404).json({message: "Student Not Found", data: {}, statusCode: 404});
        const isPasswordValid = bcrypt.compareSync(password, data.password);
        if(!isPasswordValid) return res.status(201).json({message:"Incorrect Password", statusCode: 201});
        const token = jwtGenerator({_id: data._id});
        await StudentService.updateToken({_id: data._id, token});
        const student = {
            _id: data._id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            status: data.status,
            address: data.address,
            school_id: data.school_id,
            created_at: data.created_at
        }
        return res.status(200).json({message: "Login Success", data: student, token, statusCode: 200});
    }
}
module.exports = StudentController;