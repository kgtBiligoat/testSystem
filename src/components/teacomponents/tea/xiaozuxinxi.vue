<template>
    <div class="xiaozu">
        <el-table 
            :data="group"
        >
            <el-table-column label="课题名称" prop="keti" width="200"></el-table-column>
            <el-table-column label="限制人数" prop="people" width="200"></el-table-column>
            <el-table-column label="验收截止日期" prop="time" width="300"> </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <span class="delete" @click="delet(scope)">删除</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        group: []
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getKetiMess() {
          axios.get('/teachers/getKetiMess')
          .then(data => {
              if(data.data.status !== -1)
              {
                this.group = []
                console.log(data.data)
                data.data.keti.forEach((item, index) => {
                    var t = {}
                    t.keti = item
                    t.people = 3
                    t.time = data.data.ketiTime[index].split('T')[0]
                    this.group.push(t)
                })
                console.log(this.group)
              }
          })
      },
      delet(scope) {
          
          axios.get('/teachers/deleKeti',{
              params: {
                  'keti': scope.row.keti
              }
          })
          .then(data => {
              if(data.data.status == 1) {

                  this.$message('删除成功')
                  this.getKetiMess()
              }
          })
      }
    },
    created() {
        this.getKetiMess()
    }
  }
</script>

<style scoped lang='less'>
    .xiaozu {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .el-table {
            width: 920px;
        }
        .delete {
            color: blue;
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>