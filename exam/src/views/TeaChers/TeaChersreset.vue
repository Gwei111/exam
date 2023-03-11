<template>
  <!-- 重置师资密码 -->
  <div>
   <el-dialog
     v-model="dialogVisible"
     title="重置密码"
     width="30%"
     :close-on-click-modal="false"
   >
     <div>
       <el-form
         ref="ruleFormRef"
         :model="ruleForm"
         :rules="rules"
         label-width="120px"
         class="demo-ruleForm"
         status-icon
       >
       <el-form-item label="姓名">{{ ruleForm.name }}</el-form-item>
  
        <el-form-item label="密码" prop="asspass">
            <el-input v-model="ruleForm.asspass"    show-password/>
        </el-form-item>
        <el-form-item label="确认密码" prop="oldpass">
            <el-input v-model="ruleForm.oldpass"    show-password/>
        </el-form-item>
      </el-form>
     </div>
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="add(ruleFormRef)"> 确定 </el-button>
       </span>
     </template>
   </el-dialog>
 </div>
</template>

<script setup lang="ts">
import { ref, reactive ,onMounted,toRaw} from 'vue';
import {teacheradd} from '../../api/department'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus';
const emits=defineEmits(['isShow'])
const dialogVisible = ref(false);
const props=withDefaults(
  defineProps<{
    etsid: any;
  }>(),
  {
    etsid: () =>{},
  }
)
// 重置密码
const add = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async(valid) => {
    if (valid) {   
      let res:any=await teacheradd(ruleForm)
       console.log(res);
      if(res.errCode===10000){
      ElMessage({
        type: 'success',
        message: '重置密码成功',
      })
       emits('isShow',false)
    }
    } else {
      console.log('表单信息有误')
      ElMessage({
        type: 'error',
        message: '密码不一致',
      })
      return false
    }
  })
}
const ruleForm = reactive({
  id:props.etsid.id,
  oldpass:props.etsid.pass,
  pass:'',
  name:'',
  asspass:''
});
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    if (ruleForm.oldpass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else if (value !== ruleForm.asspass) {
    callback(new Error("密码不一致!"))
  } else {
    callback()
  }
}
const ruleFormRef: any = ref<FormInstance>();
const rules = reactive<FormRules>({
  asspass: [{ validator: validatePass, trigger: 'blur'  }],
  oldpass: [{validator: validatePass2, trigger: 'blur' }],
});
// 暴露在外面
defineExpose({
 dialogVisible,
 ruleForm,
});
</script>

<style scoped>
:deep(.el-input) {
 width: 200px;
}
</style>