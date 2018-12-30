<template>
    <div class="xiaozu">
        <el-table 
            :data="group"
        >
            <el-table-column label="组内信息" prop="groupLevel" width="180">

            </el-table-column>
            <el-table-column label="姓名" prop="username" width="100">

            </el-table-column>
            <el-table-column label="学号" prop="userStuId" width="180">

            </el-table-column>
            <el-table-column label="联系方式" prop="phone" width="180">

            </el-table-column>
            <el-table-column label="性别" prop="sex" width="180">

            </el-table-column>
            <el-table-column label="选择课题" prop="select" width="100">

            </el-table-column>
        </el-table>
        <el-table style="margin-top: 50px;" :data="keti">
            <el-table-column label="课题名称" width="180" prop="keti"></el-table-column>
            <el-table-column label="课题信息" prop="mess"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import { create } from 'domain';
  export default {
    data() {
      return {
        group: [],
        keti: []
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getGroupMess() {
          axios.get('/students/getGroupMess')
          .then(data => {
              this.group = data.data
              this.group.map((item, index) => {
                  if(index == 0) {
                      item.groupLevel = '组长'
                  }
                  else {
                      item.groupLevel = '组员'
                  }
                  return item
              })

          })
      },
      getKetiMess() {
          axios.get('/students/getKetiMess')
          .then(data => {
              let group = parseInt(data.data.group)
              let keti = {
                  'keti': data.data.keti[group-1],
                  'mess': data.data.mess[group-1]
              }
              console.log(keti)
              this.keti.push(keti)
          })
      }
    },
    created() {
        this.getGroupMess()
        this.getKetiMess()
    }
  }
</script>

<style scoped lang='less'>
    .xiaozu {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        .el-table {
            width: 920px;
        }

    }
</style>