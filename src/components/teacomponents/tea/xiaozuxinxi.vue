<template>
    <div class="xiaozu">
        <el-table 
            :data="group"
        >
            <el-table-column label="实验课题" prop="data" width="180">

            </el-table-column>
            <el-table-column label="姓名" prop="name" width="100">

            </el-table-column>
            <el-table-column label="学号" prop="stuId" width="180">

            </el-table-column>
            <el-table-column label="联系方式" prop="phone" width="180">

            </el-table-column>
            <el-table-column label="性别" prop="sex" width="180">

            </el-table-column>
            <el-table-column label="组内信息" prop="groupLevel" width="100">

            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        group: [
            { data: '实验集成平台', name: "李麟博", stuId: "15030120083", groupLevel: "组长", sex: "男", phone:"18392135647"},
            { data: '实验集成平台', name: "邓帅", stuId: "15030120081", groupLevel: "组员", sex: "男", phone:"17629088705"},
            { data: '实验集成平台', name: "张子煜", stuId: "15030120017", groupLevel: "组员", sex: "男", phone:"13080930548"},
            { data: '在线学游戏设计', name: "啦啦啦", stuId: "2333333", groupLevel: "组长", sex: "男", phone:"13080930548"},
            { data: '在线学游戏设计', name: "奥巴马", stuId: "23333333", groupLevel: "组员", sex: "男", phone:"13080930548"},
            { data: '在线学游戏设计', name: "洛奇", stuId: "2333333", groupLevel: "组员", sex: "男", phone:"13080930548"},
            { data: '多任务路径规划', name: "雷神", stuId: "2333333", groupLevel: "组长", sex: "男", phone:"13080930548"},
            { data: '多任务路径规划', name: "伊泽瑞尔", stuId: "233333333", groupLevel: "组员", sex: "男", phone:"13080930548"},
            { data: '多任务路径规划', name: "圣枪游侠", stuId: "23333333", groupLevel: "组员", sex: "男", phone:"13080930548"},
            { data: '实验集成平台', name: "张三丰", stuId: "23333333", groupLevel: "组员", sex: "男", phone:"13080930548"},
            { data: '实验集成平台', name: "拉克丝", stuId: "2333333", groupLevel: "组员", sex: "男", phone:"13080930548"},
        ]
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
    .xiaozu {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .el-table {
            width: 920px;
        }

    }
</style>