<template>
  <div class="top">
    部门管理  
    <div class="left">
      <el-button type="primary" class="but" @click="add()">添加一级节点</el-button>
      <div class="thre">
        <el-tree :data="taabledata.arr" :props="defaultProps" @node-click="handleNodeClick"   default-expand-all/>
      </div>
    </div>
    <div class="right" v-if="show">
      <div class="one">
        <div class="dan">当前节点:</div>&nbsp;&nbsp;&nbsp;
        <div>{{ all.name }}</div>
      </div>
      <div class="two">
        <el-form  label-width="120px" ref="ruleFormRef"  :model="ruleForm"  class="demo-ruleForm" 
    :rules="rules">
            <el-form-item label="节点名称:" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
        </el-form>
      </div>
      <div class="bout">
        <el-button type="info" @click="del()">删除当前节点</el-button>
        <el-button type="primary" @click="updatae()">修改当前节点</el-button>
        <el-button type="success" @click="addlist()">添加子节点</el-button>
      </div>
    </div>
    <div class="right" v-if="addshow">
      <div class="two">
        <el-form  label-width="120px" ref="ruleFormRef"  :model="all"  class="demo-ruleForm" 
    :rules="rules">
            <el-form-item label="节点名称:" prop="name">
             <el-input v-model="all.name" />
    </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" class="tian" @click="addone()">添加一级节点</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted,reactive,ref} from 'vue'
import type { FormInstance, FormRules  } from 'element-plus'
import { ElMessage,ElMessageBox } from 'element-plus'
import {departmentlist,departmentadd,departmentdelete} from '../../api/department'
const ruleFormRef = ref<FormInstance>()
const show=ref(false)
const addshow=ref(false)
// 添加一级节点的显示隐藏
const add=()=>{
  all.name=''
  all.id=''
  addshow.value=true
  show.value=false
} 
// 添加一级节点
const addone=async()=>{  
let res:any=await departmentadd(all)
console.log(res);
if(res.errCode===10000){
    list()
    ElMessage({
    message: '添加成功',
    type: 'success',
  })
  }
}
// 添加子级节点
const addlist=async()=>{
  ruleForm.id=0;
  ruleForm.pid=all.id
  //这里要id不是pid
let res:any=await departmentadd(ruleForm)
if(res.errCode===10000){
  ruleForm.name=''
  list()
  ElMessage({
    message: '添加成功',
    type: 'success',
  })
}
}
// 删除
const del=async()=>{
  ElMessageBox.confirm("确定要删除吗", "删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
  .then(async () => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      let res:any=await departmentdelete({id:all.id})
      if (res.errCode === 10000) {
        console.log(res);
        list();
      } else {
        ElMessage({
          message: "删除失败",
          type: "error",
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消",
      });
      list();
    });
}
// 修改
const updatae=async()=>{
  console.log(ruleForm);
  let res:any=await departmentadd(ruleForm)
  if(res.errCode===10000){
    ElMessage({
    message: '修改成功',
    type: 'success',
  })
  list()
  }
}
// 部门
onMounted(()=>{
  list()
})
const user=reactive({
  page:1,
  psize:20
})
const taabledata=reactive({arr:[]})
const list=async()=>{
  let res:any=await departmentlist(user)
  taabledata.arr=res.data.list
}
// 添加子级节点
const ruleForm :any= reactive({
  name: '',
  pid:'',
  id:''
})
// 添加一级节点
const all:any=reactive({
  name:'',
  pid:'',
  id:''
})
const handleNodeClick = (val: any) => {
  show.value=true
  addshow.value=false
  all.name=val.name
  all.pid=val.pid
  all.id=val.id
  ruleForm.pid=val.pid
  ruleForm.id=val.id
}

const defaultProps = {
  children: 'children',
  label: 'name',
}
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入节点名称', trigger: 'blur' },
  ],
})

</script>

<style scoped>
.dan{
  font-size: 14px;
}
.top{
  display: flex;
}
.but{
  margin-top: 20px;
  margin-left: 21px;
  font-size: 8px;
}
.left{
  width: 380px;
 
}
.thre{
  overflow-y: scroll;
  max-height: 80vh;
}
.right{
  margin-top: 30px;
  margin-left: 30px;
}
.one{
  display: flex;
}
.two{
  margin-top: 20px;
  display: flex;
}
.bout{
  margin-top: 20px;
}
:deep(.el-form-item__label){
margin-left: -50px;
}
.tian{
  margin-left: 70px;
}
</style>