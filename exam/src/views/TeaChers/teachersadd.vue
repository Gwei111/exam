<template>
  <!-- 添加师资 -->
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="添加老师"
      width="40%"
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
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="ruleForm.tel" />
          </el-form-item>
          <el-form-item label="部门" prop="depid">
            <el-cascader
              placeholder="请选择角色"
              v-model="ruleForm.depid"
              :options="departmentData.cascader"
              :props="departmentData.props"
              @change="departmentDataChange"
            />
          </el-form-item>
          <el-form-item label="角色" prop="roleid">
            <el-select
              v-model="ruleForm.roleid"
              class="m-2"
              placeholder="请选择角色"
              @change="roleChange"
            >
              <el-option
                v-for="item in role"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="treadd()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive ,onMounted,toRaw} from 'vue';
import { ElMessage } from 'element-plus'
import {departmentlist,teacheradd} from '../../api/department'
import {roleList} from '../../api/role'
import type { FormInstance, FormRules } from 'element-plus';
onMounted(() => {
  getdepartmentList();
  getroleList();
});
// 部门列表
const data=reactive({
  page:'',
  psize:''
})
const departmentData = reactive({
  props: {
    value: 'id',
    label: 'name',
    children: 'children',
  },
  cascader: [],
});
const  getdepartmentList=async()=>{
  let res=await departmentlist(data)
  // console.log('部门',res);
  departmentData.cascader=res.data.list
}
// 部门点击获取id
const departmentDataChange=(val:any)=>{
  ruleForm.depid=val[toRaw(val).length-1]
}
// 获取角色
const role=ref()
const getroleList=async()=>{
  let res=await roleList(data)
  // console.log(res,'角色');
  role.value=res.data.list
}
// 角色点击获取id
const roleChange=(val:any)=>{
  ruleForm.roleid=val
}
const dialogVisible = ref(false);
const props = withDefaults(
  defineProps<{
    dialogVisible: boolean;
  }>(),
  {
    dialogVisible: false,
  }
);
// 暴露在外面
defineExpose({
  dialogVisible,
});
const emits=defineEmits(['iqadd'])
// 提交
const treadd =async () => {
  let res:any=await teacheradd(ruleForm);
  console.log(res);
  
  if(res.errCode===10000){
    ElMessage({
        type: 'success',
        message: '添加成功',
      })
      emits('iqadd',false)
  }
  
  
};
const ruleFormRef: any = ref<FormInstance>();
const ruleForm: any = reactive({
  id: 0,
  username: '',
  pass: '',
  name: '',
  tel: '',
  depid: '',
  roleid: '',
  rolename: '',
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  tel: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  depid: [
    {
      required: true,
      message: '请选择部门',
      trigger: 'change',
    },
  ],
  roleid: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'change',
    },
  ],
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  pass: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
</script>

<style scoped>
:deep(.el-input) {
  width: 380px;
}
</style>
