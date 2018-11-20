<template>
  <div class="select">
    <img src="../assets/login.png" 
    style="position:absolute;
      left:30px;
      top:30px;
    ">
    <p style="font-size:40px; margin:0px; color:rgba(255,40,0,.5);position:absolute;
    top:130px;">实验在线验收系统</p>
    <div class="login">
      <input type="text" placeholder="用户名" v-model="username">
      <input type="text" placeholder="密码" v-model="password">
      <div style="transform:translateY(20px)">
        <button @click="stuLogin">学生方式登录</button>
        <button @click="teaLogin">教职工方式登录</button>
      </div> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      password:'',
      username:'',
      userType:''
    }
  },
  methods:{
    stuLogin(){
      this.userType = 'stu'
    },
    teaLogin(){
      this.userType = 'tea'
      
    }
  }
}
</script>

<style scoped>
  .select{
    background: url(../assets/background.jpg);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .login{
    transform: translateY(20px);
    transition: all .3s ease-out;
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
