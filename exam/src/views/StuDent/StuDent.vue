<template>
  <div class="box">
    <div class="top">
      <h3>学员管理</h3>
      <div>
        <el-button plain>批量添加</el-button>
        <el-button type="primary"  @click="add">添加学生</el-button>
      </div>
    </div>
     <!-- 添加弹出框 -->
     <AddStuDent :dislogShow="dislogShow"  @click="click" ></AddStuDent>
    <div class="input">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="state.key" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="部门">
          <!-- <el-cascader v-model="state.depid" :options="departmentlistInfo" placeholder="请选择" clearable :props="props" /> -->
          <el-cascader placeholder="请选择" v-model="state.depid" :options="departmentlistInfo" :props="props" clearable />
        </el-form-item>
        <el-form-item label="班级">
          <el-select placeholder="请选择" v-model="state.classid">
            <el-option v-for="item in classlistInfo" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column property="name" label="学生姓名" />
        <el-table-column property="remarks" label="备注" />
        <el-table-column property="depname" label="所属部门" />
        <el-table-column property="classname" label="所在班级" />
        <el-table-column property="username" label="账号" />
        <el-table-column property="addtime" label="添加时间" />
        <el-table-column label="操作" show-overflow-tooltip>
          <template #default="scope">
            <span class="font">重置密码</span>
            &nbsp;
            <span class="font">修改</span>
            &nbsp;
            <span class="font" @click="del(scope.row.id)">删除</span>
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
import { ref, onMounted, reactive, toRefs } from 'vue'
import { ElTable } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { studentList, departmentsList, classesList, studentDelete } from '../../api/student';
import AddStuDent from '../../components/AddStuDent.vue'
import FenYe from "../../components/FenYe/FenYe.vue"


onMounted(() => {
  getStudentList()
  getdepartmentsList()
  getclassesList()
})

const count = reactive({
  state: {
    pid: 0,
    key: "",
    classid: '',
    depid: '',
    page:1,
  psize:10
  },
  total: 0
})
const { state, total } = toRefs(count)
// interface User {
//   name: string
//   username: string
//   pass: number
//   addtime: string
//   depname: string
//   classname: string
//   mobile: number
//   remarks: string
// }

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref([])

// 学生列表
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}

const counts = ref(0);
const tableData: any = ref([])
const getStudentList = async () => {
  const res: any = await studentList(state.value)
  console.log('学生', res.data.list);
  if (res.errCode == 10000) {
    tableData.value = res.data.list
    counts.value=res.data.counts
  }

}
// 分页
const getChildData = (val: any) => {
  // console.log(111, val)
  state.value.page = val.page;
  state.value.psize = val.psize;
  // console.log(data.psize, data.page,1234);
  
 getStudentList();
};


// 班级列表
const classlistInfo: any = ref([])
const getclassesList = async () => {
  const res: any = await classesList(count.state)
  console.log('班级列表', res.data.list);
  classlistInfo.value = res.data.list
}
// 部门列表
const props = {
  label: 'name',
  value: 'id',
  children: 'children'
}
const departmentlistInfo: any = ref([])
const getdepartmentsList = async () => {
  const res: any = await departmentsList({})
  console.log('部门列表', res.data.list[1].children);
  departmentlistInfo.value = res.data.list[1].children
}


// 查询
const search = () => {
  getStudentList()

}
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
      const res: any = await studentDelete({ id })
      // console.log(1111, res);
      if (res.errCode == 10000) {
        getStudentList()
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

// 添加
let dislogShow = ref(false)

const add = ()=>{
  dislogShow.value = true
}
const click = (e:boolean)=>{
  dislogShow.value=true
  getStudentList()

}
</script>

<style scoped lang="less">
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5%;

  h3 {
    font-weight: normal;
  }

  div {
    display: flex;
  }
}

.table .font {
  color: rgb(64 158 255);
  font-size: 12px;
  cursor: pointer;
}

.table .font:hover {
  color: rgb(160 207 255);
}

/deep/.el-input__inner {
  font-size: 12px !important
}

/deep/.el-button>span {
  font-size: 12px !important
}
</style>