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

// tableSchema
var tableSchema = mongoose.Schema({
   "source_ip": String,
   "destination_ip": String,
   "time": String,
   "number": Number
});

exports.table_Data= mongoose.model('table', tableSchema);

// sequenceSchema
var sequenceSchema = mongoose.Schema({
  "first-second": Number,
  "second-third": Number,
  "third-fourth": Number,
  "first-third": Number,
  "first-fourth": Number,
  "second-fourth": Number
});

exports.sequence_Data= mongoose.model('test_sequence', sequenceSchema);
