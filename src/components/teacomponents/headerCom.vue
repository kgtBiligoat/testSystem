<template>
  <div class="headerCom">
    <el-carousel type="card" height="190px" >
      <el-carousel-item v-for="(img,index) in imgs" :key="index">
        <img :src="img" class="img">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    data() {
        return {
            imgs: [
                '../../../static/img/tu1.jpeg',
                '../../../static/img/tu2.jpeg',
                '../../../static/img/tu3.jpeg',
                '../../../static/img/tu4.jpeg',
            ]
        }
    },
}
</script>
<style scoped lang="less">
    .headerCom {
        width: 80%;
        height: 25%;
        position: absolute;
        left: 20%;
  
        .el-carousel__item {
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            line-height: 150px;
            background: white;
            display: flex;
            justify-content: center;
            opacity: 1 !important;
            .img {
                width: 1150px;
                height:185px;
            }
        }
    }  
    /deep/ .el-carousel__arrow {
        width: 60px !important;
        height: 60px !important;
    }
</style>

