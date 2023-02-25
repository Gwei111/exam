<template>
  <div class="box">
    <div class="top">
      <p>角色管理</p>
      <p><el-button type="primary" @click="add">添加角色</el-button></p>
    </div>
    <!-- 添加弹出框 -->
    <AddRole :dislogShow="dislogShow" :item="item" @click="click"></AddRole>


    <div class="main">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名称" width="1280" />
        <el-table-column label="操作">
          <template #default="scope">
            <span class="font" @click="update">编辑</span>
            &nbsp;
            <span class="font" @click="del(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { roleList, roleAdd, roleDelete, menuList } from '../../api/role';
import AddRole from '../../components/AddRole.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

onMounted(() => {
  getRoleList()
})
// 角色列表
const tableData = ref([])
const getRoleList = async () => {
  const res: any = await roleList({})
  // console.log(res);
  if (res.errCode == 10000) {
    tableData.value = res.data.list
    // console.log(tableData.value); 
  }
}


// 添加
let dislogShow = ref(false)

const add = ()=>{
  dislogShow.value = true
}
const click = (e:boolean)=>{
  dislogShow.value=true
  getRoleList()

}
// 修改
const update = ()=>{
  dislogShow.value = true
  getRoleList()
}

const item = ref(0)


// 点击删除
const del = (id: any) => {
  console.log(id);


  ElMessageBox.confirm(
    '此操作将永久删除该文件, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      const res: any = await roleDelete({ id })
      console.log(1111, res);
      if (res.errCode == 10000) {
        getRoleList()
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      }

    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '已取消删除',
      })
    })


}
</script>

<style scoped lang="less">
.top p {
  font-size: 20px;
}

.top {
  margin-bottom: 1.5%;
  display: flex;
  justify-content: space-between;
}

.el-table {
  display: flex;
  justify-content: space-between;
}

.main .font {
  color: rgb(64 158 255);
  font-size: 12px;
  cursor: pointer;
}

.main .font:hover {
  color: rgb(160 207 255);
}

/* 添加角色 */
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

/deep/.el-form-item__content {
  clear: both !important
}

.boxall {
  margin: 0 60px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
/deep/.el-button>span{
  font-size: 12px!important
}
</style>