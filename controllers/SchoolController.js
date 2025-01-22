const bcrypt = require("bcryptjs");
const { jwtGenerator } = require("../utils/jwt");
const SchoolService = require('../services/SchoolService');
const TeacherService = require('../services/TeacherService');
const StudentService = require("../services/StudentService");

class SchoolController {
    static async login(req, res){
        try{
            const { phone, email, password } = req.body;
            const lowerCaseEmail = email ? email.toLowerCase() : null;
            const data = await SchoolService.getSchool({$or: [{email: lowerCaseEmail}, {phone}]});
            if(!data) return res.status(404).json({message: "School Not Found", data: {}, statusCode: 404});
            const isPasswordValid = bcrypt.compareSync(password, data.password);
            if(!isPasswordValid) return res.status(201).json({message:"Incorrect Password", statusCode: 201});
            const token = jwtGenerator({_id: data._id});
            await SchoolService.updateToken({_id: data._id, token});
            const school = {
                _id: data._id,
                name: data.name,
                city: data.city,
                email: data.email,
                phone: data.phone,
                state: data.state,
                status: data.status,
                address: data.address,
                created_at: data.created_at
            }
            return res.status(200).json({message: "Login Success", data: school, token, statusCode: 200});
        }
        catch(error){
            return res.status(400).json({statusCode: 400, message:"Error: "+error, data: {}});
        }
    }

    static async addTeacher(req,res){
        try{
            const {phone, email, password} = req.body;
            const lowerCaseEmail = email.toLowerCase();
            const data = await TeacherService.getTeacher({$or: [{email: lowerCaseEmail}, {phone}]});
            if(data) return res.status(202).json({message: "Teacher Already Exists", statusCode: 202});
            const hashPassword = bcrypt.hashSync(password, 8);
            const body = {
                name: req.body.name,
                email: lowerCaseEmail,
                phone: req.body.phone,
                address: req.body.address,
                status: "active",
                created_at: new Date(),
                password: hashPassword,
                school_id: req.school._id
            }
            await TeacherService.addTeacher(body);
            return res.status(200).json({message: "Teacher Registered", statusCode: 200})
        }
        catch(error){
            return res.status(400).json({statusCode: 400, message:"Error: "+error, data: {}});
        }
    }

    static async addStudent(req,res){
        try{
            const {phone, email, password} = req.body;
            const lowerCaseEmail = email.toLowerCase();
            const data = await StudentService.getStudent({$or: [{email: lowerCaseEmail}, {phone}]});
            if(data) return res.status(202).json({message: "Teacher Already Exists", statusCode: 202});
            const hashPassword = bcrypt.hashSync(password, 8);
            const body = {
                name: req.body.name,
                email: lowerCaseEmail,
                phone: req.body.phone,
                address: req.body.address,
                status: "active",
                created_at: new Date(),
                password: hashPassword,
                school_id: req.school._id,
            }
            await StudentService.addStudent(body);
            return res.status(200).json({message: "Student Registered ", statusCode: 200})
        }
        catch(error){
            return res.status(400).json({statusCode: 400, message:"Error: "+error, data: {}});
        }
    }
}
module.exports = SchoolController;