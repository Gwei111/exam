<template>
    <div>
        <el-dialog v-model="center" title="批量导入试题" width="40%" :before-close="handleClose">
            <div class="box">
                <div style="height: 125px">
                    <el-steps direction="vertical" process-status="wait">
                        <el-step />
                        <el-step />
                    </el-steps>
                </div>
                <div class="right">
                    <div class="content">
                        <div class="one">下载 <span class="tem" @click="download">学生模板</span>，批量导入试题</div>
                        <div class="two">注:从其他Excel或Word复制试题时请使用选择性粘贴 Word:右键一选择性粘贴-文本， Excel:右键一选择性粘贴一只勾选 “值”</div>
                        <div class="three">上传填写好的试题表</div>
                    </div>
                    <div class="but">
                        <el-upload ref="upload" class="upload-demo" name="file"
                            action="http://estate.eshareedu.cn/exam/api/student/upload" :headers="{ Authorization: token }"
                            :limit="1" :before-remove="beforeRemove" :before-upload="changeFiles" :on-success="addFile"
                            :on-exceed="handleExceed" :on-change="handleChanges">
                            <el-button type="primary">点击上传文件</el-button>
                        </el-upload>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('cancel')">取消</el-button>
                    <el-button type="primary" @click="yesaddAll">确定</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogTableVisible" width="70%" title="批量上传学生信息">

            <el-table :data="data" height="400" :row-style="rowState">
                <el-table-column property="name" label="姓名" width="150" />
                <el-table-column property="mobile" label="电话" width="200" />
                <el-table-column property="classname" label="班级" />
                <el-table-column property="username" label="账号" />
                <el-table-column property="remarks" label="备注" />
                <el-table-column property="" label="状态">
                    <svg style="width:20px;,height:20px;color: rgb(103, 194, 58);" viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                        <path fill="currentColor"
                            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z">
                        </path>
                    </svg>
                </el-table-column>
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addALL">完成</el-button>
                    <el-button type="primary" @click="yesaddAll">
                        导出数据
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, toRaw, reactive, toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { genFileId } from 'element-plus'
import { downLoad } from '../utils/download'
import type { UploadProps, UploadUserFile, UploadInstance, UploadRawFile } from 'element-plus'
import { studentAdd } from '../api/student';

let props = withDefaults(defineProps<{
    centerDialogVisible: boolean,
    databaseid: any
}>(), {
    centerDialogVisible: false,
    databaseid: 0
})
const emits = defineEmits(['cancel', 'batchAdd','getStudentList'])

const count = reactive({
    list: []
})
const { list } = toRefs(count)
let data = ref([])
let center:any=props.centerDialogVisible
const upload = ref<UploadInstance>()
const token = sessionStorage.getItem('token')
// 学生模板下载
const download = () => {
    downLoad('http://estate.eshareedu.cn/exam/upload/student.xlsx')
}
// 文件上传
const addFile = async (file: any) => {
    console.log(file)
    if (file.errCode === 10000) {
        data.value = file.data
    } else {
        ElMessage({
            message: file.errMsg,
            type: 'error',
        })
    }
}
const handleChanges = (file: any, fileList: any) => {
    file = file.name
    file = fileList
    //限制文件数量，此处设置限制1条
    if (fileList.length > 1) {
        fileList.splice(0, 1);
    }
}
// 上传验证
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
    data.value = []
}
const changeFiles = (file: any) => {
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        ElMessage.error('只能上传xlsx格式的文件');//限制文件类型
        return false;
    }
};
// 删除上传
const beforeRemove = (a: any) => {
    data.value = []
}
// 确定
const yesaddAll = async () => {
   
    
    dialogTableVisible.value = true
}
// excel表格
const dialogTableVisible = ref(false)
const rowState = (arg: any) => {
    return {
        backgroundColor: '#f0f9eb',
        color: '#606266'
    }
}
// 点击导出数据
const addALL= async()=>{
    
        Promise.all([
            data.value.forEach(async(item)=>{
                let res:any=await studentAdd(item)
            
            })
        ]).then(()=>{
            ElMessage({
                type: 'success',
                duration: 1000,
                message: "添加成功"
            })
            dialogTableVisible.value=false
            center=false
           
        })
        emits('getStudentList')
}

// 关闭
const handleClose = () => {
    emits('cancel')
}
</script>

<style scoped lang="less">
.box {
    display: flex;

    .right {
        .content {
            height: 125px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            div {
                font-size: 16px;
                color: #c0c4cc;
            }

            .one {
                .tem {
                    color: #134ffd;
                    cursor: pointer;
                }
            }

            .two {
                font-size: 13px;
                color: #f9492d;
            }
        }

        .but {
            margin-top: 16px;
        }

    }
}</style>