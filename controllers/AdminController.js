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

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { phone, email, password, ...updateFields } = req.body;
    
            const data = await UserService.getUser({ _id: id });
            if (!data) return res.status(404).json({ message: "User Not Found", statusCode: 404 });

            if (email || phone) {
                const existingUser = await UserService.getUser({
                    $and: [
                        { _id: { $ne: id } },
                        { $or: [{ email: email?.toLowerCase() }, { phone }] }
                    ]
                });
                if (existingUser) return res.status(409).json({ message: "Email or Phone Already Exists", statusCode: 409 });
            }
    
            if (password) updateFields.password = bcrypt.hashSync(password, 8);
            if (email) updateFields.email = email.toLowerCase();

            if (Object.keys(updateFields).length > 0) {
                updateFields.updated_at = new Date();
                await UserService.updateUser(id, updateFields);
                return res.status(200).json({ message: "User Updated Successfully", statusCode: 200 });
            }
            return res.status(400).json({message: "No valid fields provided to update", statusCode: 400});
        }
        catch (error) {
            return res.status(500).json({ statusCode: 500, message: "Error: " + error, data: {} });
        }
    }
    static async deleteUser(req, res) {
        try {
            const { id } = req.params; 
            const data = await UserService.getUser({ _id: id });

            if (!data) return res.status(404).json({ message: "User Not Found", statusCode: 404 });
            const body = {
                status: "deleted",
                updated_at: new Date()
            }
            await UserService.updateUser(id, body);
            return res.status(200).json({ message: "User Deleted Successfully", statusCode: 200 });
        }
        catch (error) {
            return res.status(400).json({ statusCode: 400, message: "Error: " + error, data: {} });
        }
    }
    
}

module.exports = AdminController;