<template>
    <div class="mainCom">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
            name: '',
            sex: '',
            phone: '',
            stuId: '' 
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped lang='less'>
    .mainCom {
        width: 80%;
        position: absolute;
        left: 20%;
        top: 36%;
        height: 70%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button {
            width: 100px;
        }
        /deep/ .el-input__inner {
            width: 400px;
        }
    }
</style>

