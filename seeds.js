var mongoose = require("mongoose");
var Picture = require("./models/pictures");
var Comment = require("./models/comment");

var data = [
    {
        name: "Test1",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1200px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
        description: "desc 1"
    },
    {
        name: "Test2",
        image: "http://travel.home.sndimg.com/content/dam/images/travel/fullset/2015/10/12/new-seven-wonders-great-wall-of-china.jpg.rend.hgtvcom.1280.960.suffix/1491581549051.jpeg",
        description: "desc 2"
    },
    {
        name: "Test3",
        image: "http://4.bp.blogspot.com/-CEgblztGpQs/ThGQTS3DSOI/AAAAAAAAAQs/OP4ywrt-Aek/w1200-h630-p-k-nu/New+Seven+Wonders+of+the+World+01a.jpg",
        description: "desc 3"
    }
];

function seedDB(){

    //remove all pictures
    Picture.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }else{
            Comment.deleteMany({}, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("removed all comments");
                }
            });
            console.log("removed all pictures")
        }
    });
    //remove all comments

    //add pictures
    data.forEach(function(seed){
        Picture.create(seed, function(err, picture){
            if(err){
                console.log(err);
            }else{
                console.log("added picture");
                //create comment for the picture
                Comment.create(
                    {
                        text: "test comment",
                        author: "author"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
                            picture.comments.push(comment);
                            picture.save();
                            console.log("created comment");
                        }
                    });
            }
        })
    });

}

module.exports = seedDB;