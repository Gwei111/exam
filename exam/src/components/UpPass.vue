<template>
    <el-dialog v-model="dialogFormVisible" title="重置密码">
        <el-form :model="form" :rules="rules" ref="ruleFormRef" status-icon>
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="oldpass">
                <el-input v-model="form.oldpass" autocomplete="off" show-password />
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="pass">
                <el-input v-model="form.pass" autocomplete="off" show-password/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { studentAdd } from '../api/student';
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { parseStringStyle } from '@vue/shared';

const props = defineProps({
    dialogFormVisible: Boolean,
    id: Number,
    name: String,
    classid: Number,
    username: String,
    pass: Number
})
watch([
    props
], () => {
    dialogFormVisible.value = props.dialogFormVisible
    form.id = props.id
    form.name = props.name
    form.classid = props.classid
    form.username = props.username
    // form.oldpass = props.pass
})


const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form: any = reactive({
    id: 0,
    name: "",
    classid: 1,
    username: "",
    pass: '',
    oldpass: '',
    // newpass:''
})

// 表单校验
const ruleFormRef = ref<FormInstance>()
let validatePass2 = (rule: any, value: any, callback: any) => {
    if (value !== form.oldpass) {
        callback(new Error("两次输入密码不一致!"));
    } else {
        callback();
    }
};
const rules = reactive<FormRules>({
    oldpass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '请输入6-16位', trigger: 'blur' }
    ],
    pass: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '请输入6-16位', trigger: 'blur' },
        {
            required: true, validator: validatePass2, message: '两次密码不一样', trigger: 'click'
        }
    ]
})

const emit = defineEmits(['stuCancel', 'stuSub'])
const cancel = () => {
    emit('stuCancel', false)
}

// 点击确定
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            dialogFormVisible.value = false
            const res: any = await studentAdd(form)
            if (res.errCode == 10000) {
                ElMessage({
                    type: 'success',
                    message: '修改成功',
                })
                emit('stuSub', false)
            } else {
                ElMessage({
                    type: 'error',
                    message: res.errMsg,
                })
            }
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>

<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>