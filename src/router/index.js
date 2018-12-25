import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import teacher from '@/components/teacher'
import student from '@/components/student'

import xiaozu from '@/components/satcomponents/stu/xiaozuxinxi'
import zuoye from '@/components/satcomponents/stu/zuoyexinxi'
import geren from '@/components/satcomponents/stu/gerenshezhi'

import teaXiaozu from '@/components/teacomponents/tea/xiaozuxinxi'
import teaketi from '@/components/teacomponents/tea/teaketi'
import teazuoye from '@/components/teacomponents/tea/teazuoye'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
    	path:'/teacher',
    	name: 'teacher',
      component: teacher,
      redirect:'/teacher/teaKeti',
      children: [
        {
          path:'teaXiaozu',
          name:'teaXiaozu',
          component:teaXiaozu
        },
        {
          path:'teaketi',
          name:'teaketi',
          component:teaketi
        },
        {
          path:'teazuoye',
          name:'teazuoye',
          component:teazuoye
        },
      ]
    },
    {
    	path:'/student',
    	name: 'student',
      component: student,
      redirect:'/student/geren',
      children:[
        {
          path:'xiaozu',
          name: 'xiaozu',
          component: xiaozu

        },
        {
          path:'geren',
          name: 'geren',
          component: geren
        },
        {
          path:'zuoye',
          name: 'zuoye',
          component: zuoye
        }
      ]
    },
  ],
  mode:'history'
})
