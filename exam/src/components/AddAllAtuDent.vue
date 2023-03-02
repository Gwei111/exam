<template>
    <div>
        <el-dialog v-model="props.centerDialogVisible" title="批量导入试题" width="40%" :before-close="handleClose">
            <div class="box">
                <div style="height: 125px">
                    <el-steps direction="vertical" process-status="wait">
                        <el-step />
                        <el-step />
                    </el-steps>
                </div>
                <div class="right">
                    <div class="content">
                        <div class="one">下载 <span class="tem">学生模板</span>，批量导入试题</div>
                        <div class="two">注:从其他Excel或Word复制试题时请使用选择性粘贴 Word:右键一选择性粘贴-文本， Excel:右键一选择性粘贴一只勾选 “值”</div>
                        <div class="three">上传填写好的试题表</div>
                    </div>
                    <div class="but">
                        <el-upload ref="upload" class="upload-demo" name="file"
                            action="http://estate.eshareedu.cn/exam/api/student/upload" :headers="{ Authorization: token }"
                            :limit="1" :before-remove="beforeRemove" :on-success="addFile" :on-exceed="handleExceed">
                            <el-button type="primary">点击上传文件</el-button>
                        </el-upload>
                    </div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="$emit('cancel')">取消</el-button>
                    <el-button type="primary" @click="confirm">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, toRaw,reactive,toRefs } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { genFileId } from 'element-plus'
import type { UploadProps, UploadUserFile, UploadInstance, UploadRawFile } from 'element-plus'
import { studentAdd } from '../api/student';

let props = withDefaults(defineProps<{
    centerDialogVisible: boolean,
    databaseid: any
}>(), {
    centerDialogVisible: false,
    databaseid: 0
})
const emits = defineEmits(['cancel', 'batchAdd'])

const count = reactive({
    list:[]
})
const {list} = toRefs(count)
let data = ref([])

const upload = ref<UploadInstance>()
const token = sessionStorage.getItem('token')
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
// 上传验证
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
    data.value = []
}
// 删除上传
const beforeRemove = (a: any) => {
    data.value = []
}
// 确定
const confirm = async () => {
    if (!data.value.length) {
        ElMessage({
            message: '请上传文件',
            type: 'warning',
        })
    }
    // 处理数据
    for (let i = 0; i < data.value.length; i++) {
        let res: any = await studentAdd(  data.value[i] )
        // console.log(data.value)
        // console.log(res)
        if (res.errCode === 10000) {
            // ElMessage({
            //     message: "添加成功",
            //     type: 'success',
            // })
            emits('batchAdd')
        } else {
            ElMessage({
                message: res.errMsg,
                type: 'error',
            })
        }
    }

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
}
</style>