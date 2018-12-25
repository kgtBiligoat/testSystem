<template>
    <div class="zuoye">
        <div style="display:flex; justify-content:center;width: 100%;">
            <el-upload
                class="upload-demo"
                action="/students/onload"
                drag
                fit
                multiple
            >
                <i class="el-icon-plus"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传rar压缩文件</div>
            </el-upload>
            <el-table border class="table" :data="table">
                <el-table-column label="指导老师姓名" width="250" prop="name">

                </el-table-column>
                <el-table-column label="指导老师电话" width="250" prop="phone">

                </el-table-column>
            </el-table>
        </div>
        <el-table
            border
        >
            <el-table-column label="文件信息" width="180" >

            </el-table-column>
            <el-table-column label="教师评价" width="730" >

            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
          table: [
              { name:'' ,phone:'' }
          ]
      }
    },
    methods: {
        getTeacherMess() {
            axios.get('/students/getTeaMess')
            .then(data => {
                this.table[0].name = data.data.username
                this.table[0].phone = data.data.phone
            })
        }
    },
    created() {
        this.getTeacherMess()
    }
  }
</script>

<style scoped lang='less'>
    .zuoye {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;
        align-items: center;
        .el-table {
            margin-top: 30px;
            width: 910px;
            border: 1px solid #E5E5E5;
        }
        .table {
            margin-left: 90px;
            width: 500px;
        }
    }
</style>