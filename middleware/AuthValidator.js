const { jwtVerify } = require("../utils/jwt");
const AdminService = require("../services/AdminService");
const SchoolService = require("../services/SchoolService");
const TeacherService = require("../services/TeacherService");

class AuthValidator{
    static async adminAuthValidate(req, res, next){
        try{
            const token = req.headers["authorization"] || req.headers["Authorization"];
            if(!token) return res.status(404).json({message: "Token Not Found", data: {}, statusCode: 404});
            jwtVerify(token);
            const data = await AdminService.getAdmin({token});
            if(!data) return res.status(403).json({message: "Session Expired", data: {}, statusCode: 403});
            req.admin = data;
            next();
        }
        catch(error){
            return res.status(401).json({message: "Unauthorized", data: {}, statusCode: 401});
        }
    }
    static async schoolAuthValidate(req, res, next){
        try{
            const token = req.headers["authorization"] || req.headers["Authorization"];
            if(!token) return res.status(404).json({message: "Token Not Found", data: {}, statusCode: 404});
            jwtVerify(token);
            const data = await SchoolService.getSchool({token});
            if(!data) return res.status(403).json({message: "Session Expired", data: {}, statusCode: 403});
            req.admin = data;
            next();
        }
        catch(error){
            return res.status(401).json({message: "Unauthorized", data: {}, statusCode: 401});
        }
    }
    static async teacherAuthValidate(req, res, next){
        try{
            const token = req.headers["authorization"] || req.headers["Authorization"];
            if(!token) return res.status(404).json({message: "Token Not Found", data: {}, statusCode: 404});
            jwtVerify(token);
            const data = await TeacherService.getTeacher({token});
            if(!data) return res.status(403).json({message: "Session Expired", data: {}, statusCode: 403});
            req.admin = data;
            next();
        }
        catch(error){
            return res.status(401).json({message: "Unauthorized", data: {}, statusCode: 401});
        }
    }
}

module.exports = AuthValidator;