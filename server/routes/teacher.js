const router = require('koa-router')()
const fs = require('fs')
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
  await teacherSchema.findOne({"_id": teaId}, async (err, doc) => {
    if(err) {
      ctx.body = {
        status: -1,
        mess: '老师数据库查找错误'
      }
    }
    if(doc) {
      doc.keti = keti
      doc.ketiMess = ketiMess
      doc.ketiTime = ketiTime
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
      ctx.body = {
        status: -1,
        mess: '老师数据不存在'
      }
    }
  })
})

module.exports = router
