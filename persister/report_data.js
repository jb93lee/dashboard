var mongoose = require('mongoose');

/**
 * data를 가져오기 위한 Mongo DB model
 * @name sequenceModel
*/

mongoose.connect("mongodb://localhost:27017/sbadmin");
var db= mongoose.connection;
db.on("error",function(){
   console.log("DB ERROR: ", err);
});
var tableSchema = mongoose.Schema({
   "source_ip": String,
   "destination_ip": String,
   "time": String,
   "number": Number
});

exports.Data= mongoose.model('table', tableSchema);

/*
Data.find(function(err,data){
   if(err) return console.log("Data Error: ",err);
   if(!data){
     console.log("Empty");
   }
   console.log(data);
   db.close();
});
*/

/* create test : OK
Data.create({'first-second':500, 'second-third':300}, function(err){
   if(err) throw err;
   console.log("mongoose success");
});
*/
