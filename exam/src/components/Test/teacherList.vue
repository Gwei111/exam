<template>
    <div>
        <el-dialog :model-value="props.dialogTeacher" title="可见老师" width="45%" :before-close="teacherClose">
            <div class="top">
                <div class="topbranch">
                    <span>部门</span>
                    <el-select v-model="depval" class="m-2" placeholder="请选择" size="default">
                        <el-option v-for="item in studentList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </div>
            </div>
            <div>

            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="teacherCancel">取消</el-button>
                    <el-button type="primary" @click="teacherConfirm">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { classList,departmentList} from '../../api/test'

const props = defineProps(['dialogTeacher'])
console.log(props);

const emit = defineEmits(['teacherCancel', 'teacherClose', 'teacherConfirm'])


const teacherCancel = () => {
    emit('teacherCancel', false)
}
const teacherClose = () => {
    emit('teacherClose', false)
}
const teacherConfirm = () => {
    emit('teacherConfirm', false)
}

const depval = ref('')//当前选中的
let studentList:any=ref([])//部门

// 部门列表
const getstudentlist=async()=>{
  let res:any=await departmentList({})
//   console.log(res);
  studentList.value=res.data.list
  
}
getstudentlist()

</script>

<style scoped lang="less">
.top{
    display: flex;
    width: 700px;
    justify-content: space-between;
}
</style>