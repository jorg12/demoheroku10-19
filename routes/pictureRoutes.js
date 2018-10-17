var express = require("express");
var router = express.Router();
var Picture = require("../models/pictures");
//var middleware = require("../middleware");

router.get("/", function (req,res) {
    res.render("landing.ejs");
});

router.get("/pictures", function(req,res){
    //res.render("index.ejs", {pictures:pictures});
    //TODO get all camps grounds
    Picture.find({}, function(err, allPictures){
        if(err)
            console.log(err);
        else{
            res.render("index.ejs", {picture:allPictures});
        }

    });
});
router.get("/pictures/new", function (req,res) {
    res.render("new.ejs");
});

router.post("/pictures", function(req,res){

     let imageToObject = req.files.upload;
     //console.log(sampleFile);
     var dataToBase64 = (imageToObject.data).toString('base64');
     var imageToDatabase="data:"+imageToObject.mimetype+";base64,"+dataToBase64;
     //console.log(imageToDatabase);
    var name= req.body.name;
    var image= imageToDatabase;
    var desc= req.body.description;
    var newPicture = {name: name, image:image, description: desc}
    Picture.create(newPicture, function (err, picture) {
        if(err)
            console.log(err);
        else
            res.redirect("/pictures");
    });
    //  pictures.push(newPicture)
    // res.redirect("/pictures");
    //get data
    //redirect
} );

router.get("/pictures/:id", function(req,res){
    Picture.findById(req.params.id).populate("comments").exec(function(err,foundPicture){
        if(err){
            console.log(err);
        }
        else{
            //console.log(foundPicture);
            res.render("show.ejs", {picture: foundPicture});
        }
    });



});

module.exports = router;

