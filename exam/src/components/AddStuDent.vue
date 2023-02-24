<!-- 添加角色 -->
<template>
    <el-dialog v-model="centerDialogVisible" title="添加" style="padding-bottom: 20px;">
        <el-form >
            <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-input style="width: 200px;"  autocomplete="off" />
            </el-form-item>


            <el-form-item style="float: right;padding-top: 10px;">
                <div>
                    <span class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="getaddRole">
                            确定
                        </el-button>
                    </span>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 添加角色结束 -->
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch, toRefs, markRaw, toRaw } from 'vue'
import { studentAdd,studentUpdate } from '../api/student';
import { ElMessage, ElMessageBox } from 'element-plus'


onMounted(() => {
    
})
// 传
const props = defineProps({
    dislogShow: Boolean,
    item: Number,
    upid: Number,
    upname: String,
    upmenus: Array
})
watch([
    props
], () => {
    centerDialogVisible.value = props.dislogShow
    // id.value = props.upid
})

// const ruleFormRef = ref<FormInstance>();

// 添加
const centerDialogVisible = ref(false)
const emit = defineEmits(['click'])
const formLabelWidth = '140px'

const menuDate = reactive<any>({
    list: []
})



// 点击确定
const getaddRole = async () => {
    centerDialogVisible.value = false
        
        // 接口
        const res: any = await studentAdd({})
        console.log(res);
        if (res.errCode == 10000) {
            ElMessage({
                type: 'success',
                message: '添加成功',
            })
            emit('click', false)
        } else {
            ElMessage({
                type: 'error',
                message: res.errMsg,
            })
        }
        // const res: any = await studentUpdate({
        //     name: props.upname,
        //     id: props.upid,
        //     menus: []
        // })
        // console.log(res);
        // if (res.errCode == 10000) {
        //     ElMessage({
        //         type: 'success',
        //         message: '修改成功',
        //     })
        //     emit('click', false)
        // } else {
        //     ElMessage({
        //         type: 'error',
        //         message: res.errMsg,
        //     })
        // }
    }

</script>

<style scoped lang="less">
/deep/.el-form-item__content {
    display: inline-block !important
}

.boxall {
    margin: 0 60px;
}
</style>