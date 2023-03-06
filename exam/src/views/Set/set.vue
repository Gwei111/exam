<template>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon label-width="auto" :rules="rules" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldpass">
            <el-input v-model="ruleForm.oldpass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password />
        </el-form-item>
        <el-form-item label="确认新密码" prop="newpass">
            <el-input v-model="ruleForm.newpass" type="password" autocomplete="off" show-password />
        </el-form-item>
        <el-form-item style="margin-left: 100px;">
            <el-button type="primary" @click="submitForm(ruleFormRef)">修改密码</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { studentChangepass } from '../../api/student';
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from "vue-router";
const router = useRouter();

const ruleFormRef = ref<FormInstance>()


const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('原密码必填'))
    } else {
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('新密码必填'))
    } else {
        callback()
    }
}
const validatePass3 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('确认新密码必填'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入不一样!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    username:'',
    oldpass: '',
    pass: '',
    newpass: '',
})

const rules = reactive<FormRules>({
    oldpass: [{ required: true, validator: validatePass, trigger: 'blur' }],
    pass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
    newpass: [{ required: true, validator: validatePass3, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async(valid) => {
        if (valid) {
            console.log('submit!')
            const res:any =  await studentChangepass(ruleForm)
            console.log(res);
            if (res.errCode == 10000) {
                ElMessage({
                    type: 'success',
                    message: '请重新登录',
                })
                router.push('/'); //跳转页面
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

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style lang="less" scoped>
/deep/.el-form-item {
    width: 300px !important
}

.el-form {

    margin: 100px 0 0 300px;
}
</style>