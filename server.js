require("dotenv").config({});
const express = require("express");
const app = express();

const path = require('path');
const Port = process.env.PORT || 3000;

app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const connectDB = require("./db/dbConnection");
connectDB();

const homeRoutes = require("./routes/homeRoutes");
const apiRoutes = require("./routes/apiRoutes");
const cookieParser = require("cookie-parser");
app.use(cookieParser())

app.use('/', homeRoutes);
app.use("/api/v1/", apiRoutes);


app.listen(Port, () => {
    console.log('server is wokring', Port);
});