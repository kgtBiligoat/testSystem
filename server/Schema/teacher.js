var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "keti": Array,
  "ketiMess": Array,
  "ketiTime": Array,
  "phone": String
});

module.exports = mongoose.model("Teacher",teacherSchema);
