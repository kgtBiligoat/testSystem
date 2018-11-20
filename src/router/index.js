import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import teacher from '@/components/teacher'
import student from '@/components/student'

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
    	component: teacher
    },
    {
    	path:'/student',
    	name: 'student',
    	component: student
    },
  ],
  mode:'history'
})
