let mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1/student");

let db = mongoose.connection

db.on("connected",() => {
	console.log('数据库连接成功')
});

db.on("error",() => {
	console.log('数据库连接错误')
});


db.on("disconnected",() => {
	console.log('数据库已经断开连接')
});

module.exports = db