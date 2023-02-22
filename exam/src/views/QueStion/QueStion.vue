<template>
  <div>
    <h3>题库管理</h3>
  </div>
  <div class="ku">
    <el-form-item label="题库名称 :" clearable>
      <el-input v-model="data.key" placeholder="请输入题库命名称" />
    </el-form-item>
    <el-form-item label="创建人:" style="margin-left: 10px">
      <el-input v-model="form.name" placeholder="请输入创建人" />
    </el-form-item>
    <el-checkbox-group v-model="form.type">
      <el-checkbox label="只看我创建的" name="type" />
    </el-checkbox-group>
    <el-button type="primary" @click="inquire()">查询</el-button>
    <el-button type="danger" @click="delass()">批量删除</el-button>
  </div>
  <div>
    <el-table
    ref="multipleTableRef"
    :data="tableData.arr"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    :header-cell-style="{ background: '#eee' }"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="title" label="题库" width="320"  >
      <template #default="scope">
          <span class="butle">
            {{scope.row.title  }}
          </span>
      </template>
    </el-table-column>
    <el-table-column property="counts" label="题量数目" width="250"/>
    <el-table-column property="addtime" label="创建时间 " width="250"/>
    <el-table-column property="admin" label="创建人" width="250"/>
    <el-table-column  label="操作" width="250">
      <template #default="scope">
        <el-button link type="primary" size="small"> 试题 </el-button>
        <el-button link type="primary" size="small"> 编辑 </el-button>
        <el-button link type="primary" size="small" @click="del(scope.row.id)"> 删除 </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref,onMounted } from 'vue';
import { ElMessage, ElMessageBox,ElTable } from 'element-plus'
import {databaselist,databasedelete,deleteall} from '../../api/department'
const form = reactive({
  name: '',
  type: [],
});
const handleSelectionChange = (val: any) => {
  console.log(val);
};
// 删除
const del=(val:any)=>{
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
        let res:any=await databasedelete({id:val})
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
// 批量删除
const delass=async()=>{
  // let res=await deleteall()
  // console.log(res);
  
}
onMounted(() => {
  list()
})
const data=reactive({
  page:1,
  psize:5,
  key:''
})
// 列表
const tableData=reactive({arr:[]})
const list=async()=>{
  let res=await databaselist(data)
  console.log(res);
  tableData.arr=res.data.list
}
// 查询
const inquire=()=>{
  list()
}
</script>

<style scoped>
.ku {
  display: flex;
  margin-top: 10px;
}
:deep(.el-checkbox__input) {
  margin-left: 16px;
}
:deep(.el-input__wrapper) {
  width: 140px;
}
.el-button--primary {
  margin-left: 10px;
}
.butle{
  color: #409eff;
}
</style>
