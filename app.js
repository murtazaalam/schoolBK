const env = process.env.NODE_ENV;
const envPath = env ? __dirname + `/.env.${env}` : __dirname + "/.env";
const dotEnv = require("dotenv");
dotEnv.config({path: envPath});

const express = require("express");

console.log('Starting application...');

const start = Date.now();

const connect = require("./config/db.config");

const adminRoutes = require("./routes/admin.routes");
const schoolRoutes = require("./routes/school.routes");
const studentRoutes = require("./routes/student.routes");
const teacherRoutes = require("./routes/teacher.routes");
const staffRoutes = require("./routes/staff.routes");
const timeTableRoutes = require("./routes/timeTable.routes");

const port = process.env.PORT || 8080;
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log("Server Started");
    return res.send("Server Started");
});

app.use("/admin", adminRoutes);
app.use("/school", schoolRoutes);
app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/staff", staffRoutes);
app.use("/time-table",timeTableRoutes);

app.listen(port, () => {
    console.log("Listening to port => ",port);
    console.log(`Listening to port => ${port}`);
    console.log(`Server Start Time: ${Date.now() - start} ms`);
    const dbStart = Date.now();
    connect((error) => {
        if(error) return console.log("Error while connecting => ",error);
        console.log("Database Connected");
        console.log(`Database Connection Time: ${Date.now() - dbStart} ms`);
    })
})