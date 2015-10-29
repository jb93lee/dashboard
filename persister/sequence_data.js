var mongoose = require('mongoose');

/**
 * data를 가져오기 위한 Mongo DB model
 * @name sequenceModel
 */
/*
mongoose.connect("mongodb://localhost:27017/sbadmin");
var db= mongoose.connection;

db.on("error",function(){
  console.log("DB ERROR: ", err);
});
*/
var sequenceSchema = mongoose.Schema({
  "first-second": Number,
  "second-third": Number,
  "third-fourth": Number,
  "first-third": Number,
  "first-fourth": Number,
  "second-fourth": Number
});

exports.Data= mongoose.model('sequence', sequenceSchema);

/*
var data= Data.find(function(err,data){
  if(err) return console.log("Data Error: ",err);
  if(!data){
    console.log("Empty");
  }
  console.log(data);
  return data;
});
*/

/*
Data.create({'first-second':500, 'second-third':300}, function(err){
   if(err) throw err;
   console.log("mongoose success");
});
*/
