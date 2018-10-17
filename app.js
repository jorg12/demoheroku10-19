var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var config = require('./config');
var fs = require('fs');
var multer=require("multer");
var  mongoose = require("mongoose");
//var Campground = require("./models/pictures");
var fileUpload = require("express-fileupload");
var seedDB = require("./seeds");

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect(config.db.uri, {useNewUrlParser: true });
//routes
var pictureRoutes = require("./routes/pictureRoutes");
app.use(fileUpload());
seedDB();       //Just for testing purposes

app.use(pictureRoutes);




app.listen(process.env.PORT, function(){
    console.log("Server Has Started");
});