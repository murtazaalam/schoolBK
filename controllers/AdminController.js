const bcrypt = require("bcryptjs");
const { jwtGenerator } = require("../utils/jwt");
const AdminService = require("../services/AdminService");
const SchoolService = require("../services/SchoolService");

class AdminController {
    static async register(req, res){
        const { name, email, password } = req.body;
        const data = await AdminService.getAdmin({email});
        if(data) return res.status(400).json({message: "Admin Already Exists", statusCode: 400});
        const hashPassword = bcrypt.hashSync(password, 8);
        const body = {
            name,
            email,
            status: "active",
            created_at: new Date(),
            password: hashPassword,
        }
        try{
            await AdminService.addNewAdmin(body);
            return res.status(200).json({message: "Admin Registered", statusCode: 200})
        }
        catch(error){
            console.log("Admin Registration Error: ", error);
        }
    }

    static async login(req, res){
        const { email, password } = req.body;
        const data = await AdminService.getAdmin({email});
        if(!data) return res.status(404).json({message: "Admin Not Found", statusCode: 404});
        if(data.status === "suspended") return res.status(400).json({message: "Admin Suspended", statusCode: 400});
        const isPasswordValid = bcrypt.compareSync(password, data.password);
        if(!isPasswordValid) return res.status(201).json({message:"Incorrect Password", statusCode: 201});
        const token = jwtGenerator({_id: data._id});
        try{
            await AdminService.updateToken({_id: data._id, token});
            const admin = {
                _id: data._id,
                name: data.name,
                email: data.email,
                status: data.status,
                created_at: data.created_at
            }
            return res.status(200).json({message: "Login Success", admin, token, statusCode: 200});
        }
        catch(error){
            console.log("Admin Login Error: ", error);
        }
    }

    static async addSchool(req, res){
        const { phone, email, password } = req.body;
        const data = await SchoolService.getSchool({$or: [{phone, email}]});
        if(data) return res.status(400).json({message: "School Already Exists", statusCode: 400});
        const hashPassword = bcrypt.hashSync(password, 8);
        const body = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            status: "active",
            created_at: new Date(),
            password: hashPassword,
        }
        try{
            await SchoolService.addSchool(body);
            return res.status(200).json({message: "School Registered", statusCode: 200})
        }
        catch(error){
            console.log("School Registration Error: ", error);
        }
    }
}

module.exports = AdminController;