var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "userStuId": String,
  "sex": String,
  "phone": String,
  "select": String,
  "teacher": String,
  "group": String
});

module.exports = mongoose.model("Students",studentSchema);
