<template>
    <div class="table">
        <el-table :data="table">
            <el-table-column label="课题" width="180" prop="keti"></el-table-column>
            <el-table-column label="组长" width="180" prop="leader"></el-table-column>
            <el-table-column label="学号" width="180" prop="stuId"></el-table-column>
            <el-table-column label="联系方式" width="180" prop="phone"></el-table-column>
            <el-table-column label="下载资料" width="100">
                <template slot-scope="scope">
                    <span class="download" @click="downLoad(scope)">下载</span>
                </template>
            </el-table-column>
            <el-table-column label="评价" >
                <template slot-scope="scope">
                    {{getKeTiName(scope)}}
                    <span class="download" @click="write(scope)">写评语</span>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="评价面板"
            :visible.sync="dialogVisible"
        >
        <el-form>
            <el-form-item label="评分">
                <el-radio v-model="radio" label="1">合格</el-radio>
                <el-radio v-model="radio" label="2">不合格</el-radio>
            </el-form-item>
            <el-form-item label="评价">
                <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="textarea"
                    :rows="rows"
                >
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="writeGo">确定</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            name: '',
            rows: 10,
            textarea: '',
            radio: '1',
            dialogVisible: false,
            isDown: Boolean,
            table: [
                {'keti': '实验在线集成平台', 'leader': '李麟博', 'stuId': '15030120083', 'phone': 18392135647}
            ]
        }
    },
    methods: {
        downLoad(scope){
            axios.post('/teachers/getDownLoad',{
                name: scope.row.leader
            },{responseType: 'blob'})
            .then(data => {
                console.log(data)
                let url = window.URL.createObjectURL(data.data)
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', 'llb2.png')
                document.body.appendChild(link)
                link.click()
            })
        },
        getKeTiName(scope) {
            this.name = scope.row.keti
        },
        write(scope) {
            this.dialogVisible = true
        },
        writeGo() {
            axios.post('/teachers/setPinjia', {
                username: this.name,
                hege: this.radio,
                pingjia: this.textarea
            })
            .then(data => {
                this.dialogVisible = false
                this.$message('评价成功')
            })
        },
        //todo
        getMess() {
            axios.get('/teachers/getMess')
            .then(data => {
                console.log(data)
            })
        }
    },
    created() {}
}
</script>

<style lang='less' scoped>
    .table {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        .el-table {
            width: 920px;
            .download {
                color: blue;
                &:hover {
                    cursor: pointer;
                }
            }
        }
        /deep/ .el-dialog {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            align-items: center;
            .el-form {
                width: 500px;
                .el-form-item {
                    height: ;
                    margin-bottom: 10px;
                }
            }
            i {
                position: relative;
                left: 312px;
                top: -22px;
            }
        }
    }
</style>

