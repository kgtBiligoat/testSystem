<template>
    <div class="geren">
        <!-- 编辑态 -->
        <el-form v-if="isEdit"
            ref="form"
            label-width="80px" 
            :model="form"  
            :rules="rules"
        >
            <el-form-item label="姓名" prop="name">
                <el-input :disabled="true" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="学号" prop="stuId">
                <el-input v-model="form.stuId"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item  label="课题选择" prop="keti">
                <el-select v-model="keti" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" @click="save('form')">保存</el-button>
                <el-button type="primary" @click="cancer">撤销</el-button>
            </el-form-item>
        </el-form>
        <!-- 只读态 -->
        <el-form label-width="80px" v-else>
            <el-form-item label="姓名:">
                {{form.name}}
            </el-form-item>
            <el-form-item label="性别:">
                {{form.sex}}
            </el-form-item>
            <el-form-item label="学号:">
                {{form.stuId}}
            </el-form-item>
            <el-form-item label="联系方式:">
                {{form.phone}}
            </el-form-item>
            <el-form-item label="课题选择:">
                {{form.keti}}
            </el-form-item>
            <el-form-item>
                <el-button @click="edit">重新设置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        var numRule = (rule,value,call) => {
            if (!value) {
                return call(new Error('学号不能为空'));
            }
            else call()
        }
        var phoneRule = (rule,value,call) => {
            if (!value) {
                return call(new Error('联系方式不能为空'));
            }
            else call()
        }
        return {
            isEdit: Boolean,
            options:[
                {
                    value: '实验在线集成平台',
                    label: '实验在线集成平台',
                },
                {
                    value: '基于在线学习的游戏设计与应用',
                    label: '基于在线学习的游戏设计与应用'
                },
                {
                    value: '多任务路径规划与决策算法',
                    label: '多任务路径规划与决策算法'
                },
                {
                    value: '协商的围捕问题',
                    label: '协商的围捕问题'
                }
            ],
            rules: {
                stuId: [
                    { validator: numRule, trigger: 'blur' }
                ],
                phone: [
                    { validator: phoneRule, trigger: 'blur' }
                ],
            },
            keti: this.$store.state.keti
            // form: {
            //     name: this.$store.state.username,
            //     sex: this.$store.state.sex || '男',
            //     phone: this.$store.state.phone,
            //     stuId: this.$store.state.stuId, 
            //     keti: this.$store.state.keti
            // }
      }
    },
    watch: {
        form: {
            handler(newName, oldName) {
                this.keti = newName.keti
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        form() {
            return {
                name: this.$store.state.username,
                sex: this.$store.state.sex || '男',
                phone: this.$store.state.phone,
                stuId: this.$store.state.stuId,
                keti: this.$store.state.keti
            }
        }
    },
    methods: {
      edit() {
          this.isEdit = true
      },  
      save(form) {
        axios.post('/students/saveStuMess', {
            username: this.form.name,
            sex: this.form.sex,
            phone: this.form.phone,
            userStuId: this.form.stuId,
            select: this.keti
        }).then(data => {
            if(data.data.status == 1) {
                this.$refs[form].validate(valid => {
                    if(valid) {
                        this.isEdit = false
                    }
                    else {
                        return false
                    }
                    this.$message('保存成功') 
                })        
            }        
            else {
                this.isEdit = true
                this.$message('保存失败')
            }
        })

      },
      cancer() {         
        this.$refs['form'].resetFields();           
      },
      getSelectMess() {
          axios.get('/students/getSelectMess')
          .then(data => {
              
          })
      }
    },
    mounted() {
        this.$store.dispatch('getUsername')
        if(!this.keti) this.isEdit = false
        else this.isEdit = true    
    }
  }
</script>

<style scoped lang='less'>
    .geren {
        transform: translate(-20px,-40px);
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