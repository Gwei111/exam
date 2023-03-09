<template>
  <div>
   <div class="zon">
    <h3>师资管理</h3>
    <el-button type="primary" @click="add">添加师资</el-button>
   </div>
    <div class="top">
      <el-form-item label="关键字" class="gaun">
        <el-input v-model="data.key" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="部门">
        <el-cascader  v-model="date.depid"  :options="options.arr" @change="handleChange" :props="props" clearable />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="date.rolename" class="m-2" placeholder="请选择角色" clearable  size="large">
            <el-option
              v-for="item in roleData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
      </el-select>
      </el-form-item>
      <el-button type="primary" @click="search()">搜索</el-button>
    </div>
  </div>
  <div>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#fafafa' }">
      <el-table-column prop="name" label="姓名" width="250" />
      <el-table-column prop="depname" label="部门" width="250" />
      <el-table-column prop="tel" label="电话" width="200" />
      <el-table-column prop="rolename" label="角色" width="250" />
      <el-table-column prop="username" label="账号" width="150" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="reset(scope.row)"> 重置密码 </el-button>
          <el-button link type="primary" size="small" @click="update(scope.row)"> 修改 </el-button>
          <el-button link type="primary" size="small" @click="del(scope.row.id)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <FenYe :counts="counts" @getChildData="getChildData" />
    <!-- 添加 -->
  <Add ref="dialog" :dialogVisible="dialogVisible"   @iqadd="iqadd" ></Add>
  <!-- 修改 -->
  <Update ref="TeacherEdits"  @isShow="isShow"></Update>
  <!-- 重置密码 -->
  <TeaCherset ref="rets" :etsid="etsid" @isShow="isShows"></TeaCherset>
</template>

<script setup lang="ts">
import { reactive, onMounted ,ref,toRaw} from 'vue';
import { teachelistr ,departmentlist,roledelete} from '../../api/department';
import {roleList} from '../../api/role'
import FenYe from '../../components/FenYe/FenYe.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Add from './teachersadd.vue' //添加师资
import Update from './teachersamend.vue' //修改
import TeaCherset from './TeaChersreset.vue' //重置密码
onMounted(() => {
  list();
  partmentlist()
  rolelist()
});
const data = reactive({
  page: '',
  psize:'',
  key: '',
});

// 师资列表
const tableData = ref([]);
const counts=ref()
const list = async () => {
  let res = await teachelistr(data);
  // console.log('师资',res);
  tableData.value=res.data.list
  counts.value=res.data.counts
};
// 部门列表
const date:any=reactive({
  page: '',
  psize:'',
  depid:'',
  rolename:'' // 角色
})
const props=ref({
  value:'id',
  label:'name',
  children:'children'
})
const options :any=reactive({arr:[]})
const partmentlist=async()=>{
  let res:any=await departmentlist(date)
  // console.log('部门',res);
  options.arr=res.data.list
}
const handleChange = (val:any) => {
  date.depid=val[toRaw(val).length-1]
}
// 角色
const roleData:any=ref([])
const rolelist=async()=>{
  let res:any=await roleList(data)
  // console.log('角色',res);
  roleData.value=res.data.list
}
// 分页
const getChildData=(val:any)=>{
  data.page=val.page;
  data.psize=val.psize
  list()
}
// 搜索
const search=async()=>{
  list()
  let res = await teachelistr({depid:date.depid});
  tableData.value=res.data.list
  counts.value=res.data.counts  
}
// 删除
const del=(id:any)=>{
  ElMessageBox.confirm(
    '是否删除',
    '提示',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async() => {
    let res:any=await roledelete({id:id})
      console.log(res);
      if(res.errCode===10000){
        ElMessage({
        type: 'success',
        message: '删除成功',
      })
      list()
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      })
    })
}
//添加
const dialog = ref<any>()
const dialogVisible = ref<any>(false)
const add:any = () => {
  // dialogVisible.value = !dialogVisible.value
  dialog.value.dialogVisible =true
}
// 添加师资
const iqadd=(val:any)=>{
  dialog.value.dialogVisible=val
  list()
}
// 修改完成
const TeacherEdits = ref<any>()
const updatid= ref({})
const update=(val:any)=>{
  updatid.value=val
  TeacherEdits.value.dialogVisible = true
  // 通过ref绑定修改页面的ruleForm直接回显
  Object.assign(TeacherEdits.value.ruleForm,val)
}
// 修改师资完成
const isShow=(val:any)=>{
  TeacherEdits.value.dialogVisible = false
  list()
}
// 重置密码
const rets=ref()
const etsid=ref({})
const reset=(val:any)=>{ 
  etsid.value=val
  rets.value.dialogVisible = true
  Object.assign(rets.value.ruleForm,val)
}
const isShows=()=>{
  rets.value.dialogVisible = false
  list()
}
</script>

<style scoped>
.zon{
  display: flex;
  justify-content: space-between;
}
.el-input {
  width: 150px;
}
.top {
  display: flex;
  margin-top: 15px;
  
}
h3{
    font-weight: normal;
  }
:deep(.el-form-item__label) {
  margin-left: 20px;
}
.gaun {
  margin-left: -20px;
}
.el-button--primary {
  margin-left: 10px;
}
:deep(.el-pagination){
  margin-left: 280px;
    margin-top: 30px
}
</style>
