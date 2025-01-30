const bcrypt = require("bcryptjs");
const { jwtGenerator } = require("../utils/jwt");
const StaffService = require('../services/StaffService');
const SchoolService = require('../services/SchoolService');
const TeacherService = require('../services/TeacherService');
const StudentService = require("../services/StudentService");
const { applySearchFilter, applySorting, applyPagination } = require('../utils/filters');
const { response } = require("express");

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
                created_at: data.created_at,
                updated_at: data.updated_at
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
    static async updateTeacher(req, res) {
        try {
            const { id } = req.params;
            const { phone, email, password, ...updateFields } = req.body;
    
            const data = await TeacherService.getTeacher({ _id: id });
            if (!data) return res.status(404).json({ message: "Teacher Not Found", statusCode: 404 });

            if (email || phone) {
                const existingStudent = await TeacherService.getTeacher({
                    $and: [
                        { _id: { $ne: id } },
                        { $or: [{ email: email?.toLowerCase() }, { phone }] }
                    ]
                });
                if (existingStudent) return res.status(409).json({ message: "Email or Phone Already Exists", statusCode: 409 });
            }
    
            if (password) updateFields.password = bcrypt.hashSync(password, 8);
            if (email) updateFields.email = email.toLowerCase();

            if (Object.keys(updateFields).length > 0) {
                updateFields.updated_at = new Date();
                await TeacherService.updateTeacher(id, updateFields);
                return res.status(200).json({ message: "Teacher Updated Successfully", statusCode: 200 });
            }
            return res.status(400).json({message: "No valid fields provided to update", statusCode: 400});
        }
        catch (error) {
            return res.status(500).json({ statusCode: 500, message: "Error: " + error, data: {} });
        }
    }
    static async deleteTeacher(req, res) {
        try {
            const { id } = req.params; 
            const data = await TeacherService.getTeacher({ _id: id });

            if (!data) return res.status(404).json({ message: "Teacher Not Found", statusCode: 404 });
            const body = {
                status: "deleted",
                updated_at: new Date()
            }
            await TeacherService.updateTeacher(id, body);
            return res.status(200).json({ message: "Teacher Deleted Successfully", statusCode: 200 });
        }
        catch (error) {
            return res.status(400).json({ statusCode: 400, message: "Error: " + error, data: {} });
        }
    }
    static async getAllTeachers(req, res) {
        try {
            const schoolId = req.school._id;
            if (!schoolId) return res.status(400).json({message: "School ID is missing in the session", statusCode: 400});

            const { page = 1, limit = 10, searchText = "", sort = "_id", order = "desc" } = req.query;

            let filter = { school_id: schoolId, status: "active" };
            filter = applySearchFilter(filter, searchText, ["name", "email"]);

            const { skip, limit: pageLimit } = applyPagination(page, limit);
            const sortKey = applySorting(sort, order);

            let totalCount = await TeacherService.getTeachersCount(filter);
            totalCount.length > 0 ? (totalCount = totalCount[0].totalCount) : (totalCount = 0)
            
            const teachers = await TeacherService.getAllTeachers(filter, sortKey, skip, pageLimit);
            
            if (!teachers || teachers.length === 0) {
                return res.status(404).json({
                    message: "No teachers found",
                    statusCode: 404,
                    data: {},
                });
            }
            return res.status(200).json({
                message: "Teachers retrieved successfully",
                statusCode: 200,
                data: teachers,
                meta: {
                    totalCount,
                    currentPage: Number(page),
                    totalPages: Math.ceil(totalCount / limit),
                },
            });
        }
        catch (error) {
            return res.status(400).json({statusCode: 400, message: "Error: " + error});
        }
    }
    static async getTeacherByID(req,res){
        try{
            const teacherId = req.params.id;

            const teacher = await TeacherService.getTeacher({_id: teacherId}, '-password -token');
            if(!teacher) return res.status(404).json({message : "Teacher not found", data: {}, statusCode: 404} );

            return res.status(200).json({message: "Teacher Data Found", statusCode: 200, data: teacher});

        }
        catch(error){
            return res.status(500).json({ statusCode: 500, message: "Error: " + error, data: {} });

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
    static async updateStudent(req, res) {
        try {
            const { id } = req.params;
            const { phone, email, password, ...updateFields } = req.body;
    
            const data = await StudentService.getStudent({ _id: id });
            if (!data) return res.status(404).json({ message: "Student Not Found", statusCode: 404 });

            if (email || phone) {
                const existingStudent = await StudentService.getStudent({
                    $and: [
                        { _id: { $ne: id } },
                        { $or: [{ email: email?.toLowerCase() }, { phone }] }
                    ]
                });
                if (existingStudent) return res.status(409).json({ message: "Email or Phone Already Exists", statusCode: 409 });
            }
    
            if (password) updateFields.password = bcrypt.hashSync(password, 8);
            if (email) updateFields.email = email.toLowerCase();

            if (Object.keys(updateFields).length > 0) {
                updateFields.updated_at = new Date();
                await StudentService.updateStudent(id, updateFields);
                return res.status(200).json({ message: "Student Updated Successfully", statusCode: 200 });
            }
            return res.status(400).json({message: "No valid fields provided to update", statusCode: 400});
        }
        catch (error) {
            return res.status(500).json({ statusCode: 500, message: "Error: " + error, data: {} });
        }
    }
    static async deleteStudent(req, res) {
        try {
            const { id } = req.params;
            const data = await StudentService.getStudent({ _id: id });

            if (!data) return res.status(404).json({ message: "Student Not Found", statusCode: 404 });
    
            const body = {
                status: "deleted",
                updated_at: new Date()
            }

            await StudentService.updateStudent(id, body);
            return res.status(200).json({ message: "Student Deleted Successfully", statusCode: 200 });
        }
        catch (error) {
            return res.status(400).json({ statusCode: 400, message: "Error: " + error, data: {} });
        }
    }
    static async getAllStudents(req, res) {
        try {
            const schoolId = req.school._id;
            if (!schoolId) return res.status(400).json({message: "School ID is missing in the session", statusCode: 400});

            const { page = 1, limit = 10, searchText = "", sort = "_id", order = "desc" } = req.query;

            let filter = { school_id: schoolId, status: "active" };
            filter = applySearchFilter(filter, searchText, ["name", "email"]);

            const { skip, limit: pageLimit } = applyPagination(page, limit);
            const sortKey = applySorting(sort, order);

            let totalCount = await StudentService.getStudentCount(filter);
            totalCount.length > 0 ? (totalCount = totalCount[0].totalCount) : (totalCount = 0)
            
            const student = await StudentService.getAllStudent(filter, sortKey, skip, pageLimit);
            if (!student || student.length === 0) {
                return res.status(404).json({
                    message: "No students found",
                    statusCode: 404,
                    data: {},
                });
            }
            return res.status(200).json({
                message: "Students retrieved successfully",
                statusCode: 200,
                data: student,
                meta: {
                    totalCount,
                    currentPage: Number(page),
                    totalPages: Math.ceil(totalCount / limit),
                },
            });
        }
        catch (error) {
            return res.status(400).json({statusCode: 400, message: "Error: " + error});
        }
    }
    static async getStudentByID(req,res){
        try{
            const studentId = req.params.id;

            const student = await StudentService.getStudent({_id: studentId}, '-password -token');
            if(!student) return res.status(404).json({message : "Student not found", data: {}, statusCode: 404} );

            return res.status(200).json({message: "Student Data Found", statusCode: 200, data: student});

        }
        catch(error){
            return res.status(500).json({ statusCode: 500, message: "Error: " + error, data: {} });

        }
    }
    static async addStaff(req,res){
        try{
            const {phone, email, password} = req.body;
            const lowerCaseEmail = email.toLowerCase();
            const data = await StaffService.getStaff({$or: [{email: lowerCaseEmail}, {phone}]});
            if(data) return res.status(202).json({message: "Staff Already Exists", statusCode: 202});
            const hashPassword = bcrypt.hashSync(password, 8);
            const body = {
                name: req.body.name,
                email: lowerCaseEmail,
                phone: req.body.phone,
                address: req.body.address,
                password: hashPassword,
                school_id: req.school._id,
            }
            await StaffService.addStaff(body);
            return res.status(200).json({message: "Staff Registered ", statusCode: 200})
        }
        catch(error){
            return res.status(400).json({statusCode: 400, message:"Error: " + error, data: {}});
        }
    }
    static async updateStaff(req, res) {
        try {
            const { id } = req.params;
            const { phone, email, password, ...updateFields } = req.body;
    
            const data = await StaffService.getStaff({ _id: id });
            if (!data) return res.status(404).json({ message: "Staff Not Found", statusCode: 404 });

            if (email || phone) {
                const existingStaff = await StaffService.getStaff({
                    $and: [
                        { _id: { $ne: id } },
                        { $or: [{ email: email?.toLowerCase() }, { phone }] }
                    ]
                });
                if (existingStaff) return res.status(409).json({ message: "Email or Phone Already Exists", statusCode: 409 });
            }
    
            if (password) updateFields.password = bcrypt.hashSync(password, 8);
            if (email) updateFields.email = email.toLowerCase();

            if (Object.keys(updateFields).length > 0) {
                updateFields.updated_at = new Date();
                await StaffService.updateStaff(id, updateFields);
                return res.status(200).json({ message: "Staff Updated Successfully", statusCode: 200 });
            }
            return res.status(400).json({message: "No valid fields provided to update", statusCode: 400});
        }
        catch (error) {
            return res.status(500).json({ statusCode: 500, message: "Error: " + error, data: {} });
        }
    }
    static async deleteStaff(req, res) {
        try {
            const { id } = req.params;
            const data = await StaffService.getStaff({_id: id});

            if (!data) return res.status(404).json({ message: "Staff Not Found", statusCode: 404 });
    
            const body = {
                status: "deleted",
                updated_at: new Date()
            }

            await StaffService.updateStaff(id, body);
            return res.status(200).json({ message: "Staff Deleted Successfully", statusCode: 200 });
        }
        catch (error) {
            return res.status(400).json({ statusCode: 400, message: "Error: " + error, data: {} });
        }
    }
    static async getAllStaffs(req, res) {
        try {
            const schoolId = req.school._id;
            if (!schoolId) return res.status(400).json({message: "School ID is missing in the session", statusCode: 400});

            const { page = 1, limit = 10, searchText = "", sort = "_id", order = "desc" } = req.query;

            let filter = { school_id: schoolId, status: "active" };
            filter = applySearchFilter(filter, searchText, ["name", "email"]);

            const { skip, limit: pageLimit } = applyPagination(page, limit);
            const sortKey = applySorting(sort, order);

            let totalCount = await StaffService.getStaffsCount(filter);
            totalCount.length > 0 ? (totalCount = totalCount[0].totalCount) : (totalCount = 0)
            
            const staff = await StaffService.getAllStaff(filter, sortKey, skip, pageLimit);

            if (!staff || staff.length === 0) {
                return res.status(404).json({
                    message: "No staff found",
                    statusCode: 404,
                    data: {},
                });
            }
            return res.status(200).json({
                message: "Staffs retrieved successfully",
                statusCode: 200,
                data: staff,
                meta: {
                    totalCount,
                    currentPage: Number(page),
                    totalPages: Math.ceil(totalCount / limit),
                },
            });
        }
        catch (error) {
            return res.status(400).json({statusCode: 400, message: "Error: " + error});
        }
    }
    static async getStaffByID(req,res){
        try{
            const staffId = req.params.id;

            const staff = await StaffService.getStaff({_id: staffId}, '-password -token');
            if(!staff) return res.status(404).json({message : "Staff not found", data: {}, statusCode: 404} );

            return res.status(200).json({message: "Staff Data Found", statusCode: 200, data: staff});

        }
        catch(error){
            return res.status(500).json({ statusCode: 500, message: "Error: " + error, data: {} });

        }
    }
    
}
module.exports = SchoolController;