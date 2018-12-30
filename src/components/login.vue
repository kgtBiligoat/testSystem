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
      <el-input placeholder="请输入用户名" v-model="username">
        <template slot="prepend">用户名</template>
      </el-input>
      <el-input placeholder="请输入密码" v-model="password" type="password">
        <template slot="prepend">密码</template>
      </el-input>
      <div >
        <el-button @click="stuLogin" type="warning">
          <!-- <router-link to="/student">学生方式登录</router-link> -->
          学生方式登录
        </el-button>
        <el-button @click="teaLogin" type="warning">
          <!-- <router-link to="/teacher">教职工方式登录</router-link> -->
          教职工方式登录
        </el-button>
      </div> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      password: '',
      username: '',
      usertype: ''
    }
  },
  methods:{
    stuLogin(){
      this.usertype = 'student'
      let param = {
        'username': this.username,
        'password': this.password,
        'usertype': this.usertype
      }
      axios.post('/students',param)
      .then((data) => {
        if(data.data.status === -1) this.$message('用户名错误')
        else if(data.data.status === 0) this.$message('密码错误')
        else if(data.data.status === 1){
          this.$message('登陆成功')
          this.$store.commit('setUsername', this.username)
          setTimeout(() => {
					  this.$router.push('/student')
				  },1000)
        }
        else {
          this.$message('服务器错误')
        }
      })
    },
    teaLogin(){
      this.usertype = 'teacher'
      console.log(this.usertype)
      let param = {
        'username': this.username,
        'password': this.password,
        'usertype': this.usertype
      }  
      axios.post('/teachers/login',param)
      .then(data => {
        if(data.data.status === -1) this.$message('用户名错误')
        else if(data.data.status === 0) this.$message('密码错误')
        else if(data.data.status === 1){
          this.$message('登陆成功')
          setTimeout(() => {
					  this.$router.push('/teacher')
				  },1000)
        }
        else {
          this.$message('服务器错误')
        }
      })   
    }
  },
  mounted() {
    document.cookies = ''
  }
}
</script>

<style scoped lang="less">
  .select{
    background: url(../assets/background.jpg);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login{
      transform: translateY(20px);
      transition: all .3s ease-out;
      width: 100%;
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .el-input {
        padding-left: 60%;
        /deep/ .el-input-group__prepend{
          width: 50px;  
          text-align: center;
        }
        /deep/ .el-input__inner {
          width: 500px;
          height: 50px;
        }
      }
    
      button {
        width: 150px;
      }
    }
}

</style>
