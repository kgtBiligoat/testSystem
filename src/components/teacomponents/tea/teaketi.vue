<template>
    <div class="keti">
        <el-form 
            :model="form"
        >
            <el-form-item label="课题名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="课题要求">
                <el-input type="textarea" v-model="form.mess"></el-input>
            </el-form-item>
            <el-form-item label="验收截止日期"><br>
                <el-date-picker
                    v-model="form.time"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
          form: {
              name: '',
              mess: '',
              time: ''
          }
      }
    },
    methods: {
      submit() {
          console.log(this.form)
        axios.post('/teachers/setKeti', {
                name: this.form.name,
                mess: this.form.mess,
                time: this.form.time
        })
        .then(data => {
            console.log(data)
        })
      }
    }
  }
</script>

<style scoped lang='less'>
    .keti {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .el-table {
            width: 920px;
        }
        /deep/.bfui-icon-calendar {
            position: absolute;
            left: 370px;
            top: 0px;
        }
    }
</style>