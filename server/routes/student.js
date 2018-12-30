const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const studentSchema = require('../Schema/student.js')
const teacherSchema = require('../Schema/teacher.js')

router.prefix('/students')

router.post('/', async (ctx, next) => {
  var request =  ctx.request.body;
  var username =  request.username;
  var password =  request.password;
  var usertype =  request.usertype;
  if(usertype === 'student'){
    await studentSchema.findOne({'username':username},async (err,doc) => {
      if(err) {
        ctx.response.body = {
          status: -10,
          msg: '查找错误'
        }
      }
      else {
        if(doc) {
          if(doc._doc.password === password) {
            ctx.response.body = {
              status: 1,
              msg: '登陆成功'
            }
            ctx.cookies.set('userId',doc._id,{
              domain:'localhost', // 写cookie所在的域名
              path:'/',       // 写cookie所在的路径
              maxAge: 24*60*60*1000,   // cookie有效时长
              expires:new Date('2018-02-08'), // cookie失效时间
              httpOnly:false,  // 是否只用于http请求中获取
              overwrite:false  // 是否允许重写            
            })
          }
          else {
            console.log(doc)
            ctx.response.body = {
              status: 0,
              msg: '密码错误'
            }
          }
        }
        else {
          ctx.response.body = {
            status: -1,
            msg: '用户不存在'
          }
        }
      }
    })
  }
  else{
    console.log('不是学生')
  }
})

router.get('/getStuMess', async (ctx,next) => {
  var userId = ctx.request.query.userId
  let doc = await studentSchema.findOne({'_id': userId})
  if(doc) {
    ctx.body = {
      doc: doc
    }   
  } else {
    ctx.body = {
      doc: doc
    }
  }
})

router.post('/saveStuMess',async (ctx, next) => {
  var request =  ctx.request.body;
  var sex = request.sex
  var phone = request.phone
  var userStuId = request.userStuId
  var select = request.select
  var username = request.username
  let doc = await studentSchema.findOne({'username':username}, async (err, doc) => {
    if(err) {
      ctx.response.body = {
        status: -10,
        msg: '查找错误'
      }
    }
    else {
      if(doc) {
        doc.select = select
        doc.sex = sex
        doc.phone = phone
        doc.userStuId = userStuId   
        await doc.save((err) => {
          if(err){
            ctx.response.body = {
              status: -1,
              msg:'保存失败',
            }
          }
          else{
            ctx.response.body = {
              status: 1,
              msg:'保存成功',
            }
          }
        }) 
      }
      else {
        ctx.response.body = {
          status: -2,
          msg: '查找失败'
        }
      }

    }
  })
})

router.post('/onload', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  console.log(__dirname)
  let filePath = path.join(__dirname, 'file/李麟博/') + `/${file.name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);

  let _id = ctx.cookies.get('userId')
  let doc = await studentSchema.findOne({"_id": _id})
  if(doc) {
    doc.filename = file.name
    let err = await doc.save()
    if(err) {
      ctx.body = {
        status: 1,
        mess: "上传成功"
      }
    } else {
      ctx.body = {
        status: -1,
        mess: '上传失败'
      }
    }
  }
  else {
    ctx.body = {
      status: -1,
      mess: '学生信息不存在'
    }
  }
})

router.get('/getTeaMess', async (ctx, next) => {
  var userId = ctx.cookies.get('userId')
  let doc = await studentSchema.findOne({"_id": userId})
  if(doc){
    let TeacherName = doc.teacher
    let teaDoc = await teacherSchema.findOne({"username": TeacherName})
    if(teaDoc) {
      ctx.body = teaDoc
    }else {
      ctx.body = {
        status: -1,
        mess: "老师数据不存在"
      }
    }
  }
  else ctx.body = {
    status: -1,
    mess: "学生数据不存在"
  }

})

router.get('/getGroupMess', async (ctx, next) => {
  let userId = ctx.cookies.get('userId')
  var doc = await studentSchema.findOne({'_id': userId})
  if(doc){
    var group = doc.group
    let groupDoc = await studentSchema.find({"group": group})
    if(groupDoc){
      ctx.body = groupDoc
    }
    else {
      ctx.body = {
        status: -1,
        mess:'组查询失败'
      }
    }
  }
  else ctx.body = {
    status: -1,
    mess: '学生信息查询失败'
  }
})

router.get('/getKetiMess', async (ctx, next) => {
  let userId = ctx.cookies.get('userId')
  let doc = await studentSchema.findOne({'_id': userId})
  if(doc) {
    let teacherName = doc.teacher
    let teaDoc = await teacherSchema.findOne({"username": teacherName})
    if(teaDoc) {
      ctx.body = {
        'keti': teaDoc.keti,
        'mess': teaDoc.ketiMess,
        'group': doc.group
      }
    }
    else ctx.body = {
      status: -1,
      mess: '老师不存在'
    }
  }
  else {
    ctx.body = {
      status: -1,
      mess: '学生不存在'
    }
  }

})

router.get('/getMess', async (ctx) => {
    let _id = ctx.cookies.get('userId')
    let doc = await studentSchema.findOne({'_id': _id})
    if(doc) {
      ctx.body = {
        name: doc.filename
      }
    }
    else ctx.body = {
      status: -1,
      mess: '学生信息不存在'
    }
})

router.get('/deleFile', async (ctx) => {
  console.log(1)
  let _id = ctx.cookies.get('userId')
  let doc = await studentSchema.findOne({'_id': _id})
  if(doc) {
    doc.filename = ''
    let err = await doc.save()
    if(err) ctx.body = {
      status: 1,
      mess: '保存成功'
    }
    else ctx.body = {
      status: -1,
      mess: '保存失败'
    }
  }
  else ctx.body = {
    status: -1,
    mess: '学生数据不存在'
  }
})

router.get('/getPingjia', async ctx => {
  let id = ctx.cookies.get('userId')
  let doc = await studentSchema.findOne({'_id': id})
  if(doc) {
    ctx.body = doc
  }
  else ctx.body = {
    status: -1,
    mess: '学生信息不存在'
  }
})
module.exports = router
