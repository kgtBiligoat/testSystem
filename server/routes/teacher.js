const router = require('koa-router')()
const fs = require('fs')
const send = require('koa-send')
const path = require('path')
const studentSchema = require('../Schema/student.js')
const teacherSchema = require('../Schema/teacher.js')

router.prefix('/teachers')

router.post('/login',async (ctx, next) => {
  var request =  ctx.request.body;
  var username =  request.username;
  var password =  request.password;
  var usertype =  request.usertype;
  console.log(username, password, usertype)
  if(usertype === 'teacher'){
    await teacherSchema.findOne({'username':username},async (err,doc) => {
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
              maxAge: 2*60*60*1000,   // cookie有效时长
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
    console.log('不是老师')
  }
})

router.post('/setKeti', async (ctx, next) => {
  var teaId = ctx.cookies.get('userId')
  var req = ctx.request.body
  var keti = req.name
  var ketiMess = req.mess
  var ketiTime = req.time
  let doc = await teacherSchema.findOne({"_id": teaId})
  if(doc) {
    doc.keti.push(keti)
    doc.ketiMess.push(ketiMess)
    doc.ketiTime.push(ketiTime)
    let err = await doc.save()
    if(err){
      ctx.response.body = {
        status: 1,
        msg:'保存成功',
      }
    }
    else{
      ctx.response.body = {
        status: -1,
        msg:'保存失败',
      }
    }
  }
  else {
    ctx.body = {
      status: -1,
      mess: '老师数据不存在'
    }
  }
})

router.get('/getKetiMess', async (ctx, next) => {
  let _id = ctx.cookies.get('userId')
  let doc = await teacherSchema.findOne({'_id':_id})
  if(doc){
    ctx.body = doc
  }else {
    ctx.body = {
      status: -1,
      mess: "老师数据不存在"
    }
  }
})

router.get('/deleKeti', async (ctx, next) => {
  var ketiName = ctx.request.query.keti
  var teaId = ctx.cookies.get('userId')
  let doc = await teacherSchema.findOne({'_id': teaId})
  if(doc){
    doc.keti.forEach((item, index) => {
      if(item === ketiName) {
        doc.keti.splice(index, 1)
        doc.ketiMess.splice(index, 1)
        doc.ketiTime.splice(index, 1)
      }
    })
    let err = doc.save()
    if(err) ctx.body = {
      status: 1,
      mess: '删除成功'
    }
    else {
      ctx.body = {
        status: -1,
        mess: '删除失败'
      }
    }
  }
  else {
    ctx.body = {
      status: -1,
      mess: '教师数据不存在'
    }
  }
})

router.post('/getDownLoad', async (ctx, next) => {
  let userName = ctx.request.body.name
  let doc = await studentSchema.findOne({'username': userName})
  if(doc) {
    let filename = doc.filename
    let filePath = path.join(__dirname, `file/${userName}`)
    ctx.body = await fs.createReadStream(`${filePath}/${filename}`)
  }
  else {
    ctx.body = {
      status: -1,
      mess: '下载失败'
    }
  }
})

//获取小组mess TODO
// router.get('/getMess', async (ctx, next) => {
//   let _id = ctx.cookies.get('userId')
//   let doc = await teacherSchema.findOne({'_id': _id})
//   if(doc){
//     doc.keti.forEach((item, index) => {
//       let stuDoc = await studentSchema.findOne({})
//     })
//   }
//   else {
//     ctx.body = {
//       status: -1,
//       mess: '教师信息不存在'
//     }
//   }
// })

router.post('/setPinjia', async (ctx, next) => {
  let ketiName = ctx.request.body.username
  let hege = ctx.request.body.hege
  let pingjia = ctx.request.body.pingjia
  console.log(1)
  let doc = await studentSchema.find({"select": ketiName})
  if(doc){
    doc.forEach(async (item, index) => {
      doc[index].hege = hege
      doc[index].pingjia = pingjia
      await doc[index].save()
    })
    ctx.body = {
      status: 1,
      mess: '评价成功'
    }
  }
  else ctx.body = {
    status: -1,
    mess: '课题不存在'
  }
})
module.exports = router
