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
  
        <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.oldpass" />
        </el-form-item>
      </el-form>
     </div>
     <template #footer>
       <span class="dialog-footer">
         <el-button @click="dialogVisible = false">取消</el-button>
         <el-button type="primary" @click="add()"> 确定 </el-button>
       </span>
     </template>
   </el-dialog>
 </div>
</template>

<script setup lang="ts">
import { ref, reactive ,onMounted,toRaw,defineExpose,defineProps} from 'vue';
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
const add=async()=>{
 let res:any=await teacheradd(ruleForm)
 console.log(res);
 if(res.errCode===10000){
   ElMessage({
       type: 'success',
       message: '重置密码成功',
     })
     emits('isShow',false)
 }
}
const ruleForm = reactive({
  id:props.etsid.id,
  oldpass:props.etsid.pass,
  pass:'',
  name:'',
  // oldpass:"",
  // checkPass: '',
  // tel:'',
  // depid:'',
  // roleid:'',
  // username:''
});
const ruleFormRef: any = ref<FormInstance>();
const rules = reactive<FormRules>({
 pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
 checkPass: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
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