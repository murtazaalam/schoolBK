const bcrypt = require("bcryptjs");
const { jwtGenerator,jwtVerify } = require("../utils/jwt");
const AdminService = require("../services/AdminService");
const SchoolService = require("../services/SchoolService");
const UserService = require("../services/UserService");

class AdminController {
    static async register(req, res){
        try{
            const { name, email, password } = req.body;
            const lowerCaseEmail = email.toLowerCase();

            const data = await AdminService.getAdmin({email: lowerCaseEmail});
            if(data) return res.status(202).json({message: "Admin Already Exists", statusCode: 202});
            
            const hashPassword = bcrypt.hashSync(password, 8);
            const body = {
                name,
                email: lowerCaseEmail,
                password: hashPassword,
            }

            await AdminService.addNewAdmin(body);
            return res.status(200).json({message: "Admin Registered", statusCode: 200})
        }
        catch(error){
            return res.status(400).json({statusCode: 400, message:"Error: "+error, data: {}});
        }
    }
    static async login(req, res){
        try{
            const { email, password } = req.body;
            const lowerCaseEmail = email.toLowerCase();

            const data = await AdminService.getAdmin({email: lowerCaseEmail});
            
            if(!data) return res.status(404).json({message: "Admin Not Found", statusCode: 404});
            if(data.status === "suspended") return res.status(400).json({message: "Admin Suspended", statusCode: 400});
            
            const isPasswordValid = bcrypt.compareSync(password, data.password);
            
            if(!isPasswordValid) return res.status(201).json({message:"Incorrect Password", statusCode: 201});
            
            const token = jwtGenerator({_id: data._id});
            await AdminService.updateToken({_id: data._id, token});

            const admin = {
                _id: data._id,
                name: data.name,
                email: data.email,
                status: data.status,
                created_at: data.created_at,
                updated_at: data.updated_at
            }
            return res.status(200).json({message: "Login Success", admin, token, statusCode: 200});
        }
        catch(error){
            return res.status(400).json({statusCode: 400, message:"Error: "+error, data: {}});
        }
    }
    static async addSchool(req, res){
        try{
            const { phone, email, password } = req.body;
            const lowerCaseEmail = email.toLowerCase();

            const data = await SchoolService.getSchool({$or: [{email: lowerCaseEmail}, {phone}]});
            
            if(data) return res.status(202).json({message: "School Already Exists", statusCode: 202});
            
            const hashPassword = bcrypt.hashSync(password, 8);
            const body = {
                name: req.body.name,
                email: lowerCaseEmail,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                password: hashPassword,
            }

            await SchoolService.addSchool(body);
            return res.status(200).json({message: "School Registered", statusCode: 200})
        }
        catch(error){
            return res.status(400).json({statusCode: 400, message:"Error: "+error, data: {}});
        }
    }
    static async addUser(req, res){
        try{
            const { phone, email, password } = req.body;
            const lowerCaseEmail = email.toLowerCase();
            console.log("hhhhh");

            const data = await UserService.getUser({$or: [{email: lowerCaseEmail}, {phone}]});
            
            if(data) return res.status(202).json({message: "User Already Exists", statusCode: 202});
            
            const hashPassword = bcrypt.hashSync(password, 8);
            const createdBy = req.admin ? req.admin._id : null;
            const body = {
                name: req.body.name,
                email: lowerCaseEmail,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                role: req.body.role,
                created_by: createdBy,
                password: hashPassword,
                 
            }

            await UserService.addUser(body);
            return res.status(200).json({message: "User Registered", statusCode: 200})
        }
        catch(error){
            return res.status(400).json({statusCode: 400, message:"Error: "+error, data: {}});
        }
    }
}

module.exports = AdminController;