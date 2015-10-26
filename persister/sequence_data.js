var mongoose = require('mongoose');

/**
 * data를 가져오기 위한 Mongo DB model
 * @name sequenceModel
 */
var sequenceModel = function () {

  var sequenceSchema = mongoose.Schema({
    first: String,
    second: String,
    third: String,
    fourth: String,
    fifth: String
    sixth: String
  });
 

  return mongoose.model('sequence', sequenceSchema);
};

module.exports = new sequenceModel();