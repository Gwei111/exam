<template>
  <div class="box">
    <div class="top">
      <p>角色管理</p>
      <p><el-button type="primary" @click="add">添加角色</el-button></p>
    </div>
    <!-- 添加弹出框 -->
    <AddRole :dislogShow="dislogShow" :item="item" @click="click" :upid="upid" :upname="upname" :upmenus="upmenus"></AddRole>
    <div class="main">
      <el-table :data="tableData" :model="data">
        <el-table-column prop="name" label="名称"/>
        <el-table-column label="操作" class="right">
          <template #default="scope">
            <span class="font right" @click="update(scope.row)">编辑 &nbsp; &nbsp;</span>
            <span class="font right" @click="del(scope.row.id)">删除 </span> 
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <FenYe :counts="counts"
           @getChildData="getChildData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { roleList, roleAdd, roleDelete, menuList } from '../../api/role';
import AddRole from '../../components/AddRole.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import FenYe from "../../components/FenYe/FenYe.vue"
import { studentAdd } from '../../api/student';

onMounted(() => {
  getRoleList()
})
// 角色列表
const tableData = ref([])
const data = reactive({
  page:1,
  psize:10,
  name:'',
  menus:[]

})
const counts = ref(0);
const getRoleList = async () => {
  const res: any = await roleList(data)
  // console.log(res.data.counts);
  if (res.errCode == 10000) {
    tableData.value = res.data.list
    counts.value=res.data.counts
    // menus.value = res.data.list.index
  }
}
// 分页
const getChildData = (val: any) => {
  data.page = val.page;
  data.psize = val.psize;
  // console.log(data.psize, data.page,1234);
  
 getRoleList();
};

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
let upid = ref(0)
let upname = ref('')
let upmenus = ref([])
const update = async(row:any)=>{
  // console.log(id);
  upid=row.id
  upname.value = row.name
  upmenus.value = row.menus
  console.log(row);
  
  dislogShow.value = true
  getRoleList()
  // const res = await roleAdd({
  //   name:data.name,
  //   menus:data.menus
  // })
  // console.log(res);
  
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
  // float: right;
}
// /deep/.el-table_1_column_2 {
//   float: right!important;
// }

.main .font:hover {
  color: rgb(160 207 255);
}

/deep/.el-table tr{
  // background-color: red;
  display: flex;
  width: 90vw;
  justify-content: space-between;
  border-bottom:var(--el-table-border)
}
/deep/.el-table tr:hover {
background-color: var(--el-fill-color-light);
}
/* 添加角色 */
/deep/.el-button>span{
  font-size: 12px!important
}

</style>