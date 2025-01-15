const env = process.env.NODE_ENV;
const envPath = env ? __dirname + `/.env.${env}` : __dirname + "/.env";
const dotEnv = require("dotenv");
dotEnv.config({path: envPath});

const express = require("express");

console.log('Starting application...');

const start = Date.now();

const connect = require("./config/db.config");
const adminRoutes = require("./routes/admin.routes");

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