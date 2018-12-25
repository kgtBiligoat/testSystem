var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "keti": String,
  "ketiMess": String,
  "ketiTime": String,
  "phone": String
});

module.exports = mongoose.model("Teacher",teacherSchema);
