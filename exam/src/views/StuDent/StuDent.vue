<template>
  <div class="box">
    <div class="top">
      <h3>学员管理</h3>
      <div>
        <el-button plain @click="addall">批量添加</el-button>
        <el-button type="primary" @click="add">添加学生</el-button>
      </div>
    </div>
    <!-- 批量添加 -->
    <AddAllAtuDent v-if="centerDialogVisible" :centerDialogVisible="centerDialogVisible" :databaseid="route.query.id"
      @cancel="centerDialogVisible = false" @batchAdd="batchAdd"></AddAllAtuDent>
    <!-- 添加弹出框 -->
    <AddStuDent :dislogShow="dislogShow" :upusername="upusername" :uppass="uppass" :upclassid="upclassid"
      :updepid="updepid" :upname="upname" :upmobile="upmobile" :upremarks="upremarks" :upid="upid" @stuCancel="stuCancel"
      @stuSub="stuSub"></AddStuDent>
    <!-- 重置密码 -->
    <UpPass :dialogFormVisible="dialogFormVisible" :username="username" :pass="pass" :classid="classid" :name="name"
      :id="id" @stuCancel="stuCancel" @stuSub="stuSub"></UpPass>
    <div class="input">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="state.key" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="部门">
          <el-cascader placeholder="请选择" v-model="state.depid" @change="getDepid" :options="departmentlistInfo"
            :props="props" clearable />
        </el-form-item>
        <el-form-item label="班级">
          <el-select placeholder="请选择" v-model="state.classid" @change="changeclass">
            <el-option v-for="item in classlistInfo" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="delAll">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" enctype=“multipart/form-data”
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column property="name" label="学生姓名" />
        <el-table-column property="remarks" label="备注" />
        <el-table-column property="depname" label="所属部门" />
        <el-table-column property="classname" label="所在班级" />
        <el-table-column property="username" label="账号" />
        <el-table-column property="addtime" label="添加时间" />
        <el-table-column label="操作" show-overflow-tooltip>
          <template #default="scope">
            <span class="font" @click="upoldpass(scope.row)">重置密码</span>
            &nbsp;
            <span class="font" @click="update(scope.row)">修改</span>
            &nbsp;
            <span class="font" @click="del(scope.row.id)">删除</span>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <FenYe :counts="counts" @getChildData="getChildData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRefs } from 'vue'
import { ElTable } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { studentList, departmentsList, classesList, studentDelete, studentDeleteall } from '../../api/student';
import AddStuDent from '../../components/AddStuDent.vue'
import AddAllAtuDent from '../../components/AddAllAtuDent.vue'
import FenYe from "../../components/FenYe/FenYe.vue"
import UpPass from "../../components/UpPass.vue"
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()

onMounted(() => {
  getStudentList()
  getdepartmentsList()
  // getclassesList()
})

const count = reactive({
  state: {
    pid: 0,
    key: '',
    classid: '',
    depid: '',
    page: 1,
    ids: 0,
    psize: 10,
    databaseid:Number(route.query.id),
  },
  total: 0,
  centerDialogVisible: false,
})
const { state, total, centerDialogVisible } = toRefs(count)

// 多选
interface User {
  name: string
  username: string
  pass: number
  addtime: string
  depname: string
  classname: string
  mobile: number
  remarks: string
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>()
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val.map((item: any) => item.id)
  // console.log(multipleSelection.value);

}
// 学生列表


const counts = ref(0);
const tableData: any = ref([])
const getStudentList = async () => {
  const res: any = await studentList(count.state)
  // console.log('学生', res.data.list);
  if (res.errCode == 10000) {
    tableData.value = res.data.list
    counts.value = res.data.counts
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



// 部门列表
const props = {
  label: 'name',
  value: 'id',
  children: 'children',
  checkStrictly: true,
}
const departmentlistInfo: any = ref([])
const getdepartmentsList = async () => {
  // let aa = { page: 1, psize: 10 }
  const res: any = await departmentsList({})
  // console.log('部门列表', res.data.list);
  departmentlistInfo.value = res.data.list
}

// 获取部门最后一个id
const getDepid = (val: any) => {
  if (val) {
    state.value.depid = val.at(-1)
    console.log(state.value.depid );
    
  }
  getclassesList()

}
// 班级列表
const depid = ref(0)
const classlistInfo: any = ref([])
const getclassesList = async () => {
  
  const res: any = await classesList({ depid: state.value.depid })
  // console.log('班级列表', res.data.list);
  classlistInfo.value = res.data.list
  // console.log(state.value.depid);

}
const changeclass = async( val:any)=>{
  console.log(val);
  state.value.classid = val
  
  // depid.value = val
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


// 批量删除
const delAll = () => {
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
      let idAll: any = ref()
      idAll = multipleSelection.value
      // console.log(idAll);
      const res: any = await studentDeleteall({ ids: idAll })
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


// 修改点击完成关闭弹框
const stuCancel = (val: any) => {
  dislogShow.value = val

}
// 修改点击确定关闭弹框
const stuSub = (val: any) => {
  dislogShow.value
  getStudentList()

}
// 添加
let dislogShow = ref(false)
const add = () => {
  dislogShow.value = true

}

//修改
let upid = ref()
let upname = ref('')
let upmobile = ref()
let upremarks = ref('')
let upclassid = ref()
let updepid = ref()
let upusername = ref('')
let uppass = ref()

const update = (row: any) => {
  // console.log(id);
  upid.value = row.id
  upname.value = row.name
  upremarks.value = row.remarks
  upmobile.value = row.mobile
  updepid.value = row.depid
  upclassid.value = row.classid
  upusername.value = row.username
  uppass.value = row.pass
  console.log(row);
  dislogShow.value = true
  getStudentList()
}

// 重置密码
let id = ref()
let name = ref('')
let classid = ref()
let pass = ref()
let username = ref('')
let dialogFormVisible = ref(false)
const upoldpass = (row: any) => {
  dialogFormVisible.value = true
  id.value = row.id
  name.value = row.name
  classid.value = row.classid
  username.value = row.username
  pass.value = row.pass
  console.log(row);
  getStudentList()

}

// 批量添加试题
const addall = () => {
  centerDialogVisible.value = true
}
// 批量添加试题关闭
const batchAdd = () => {
  centerDialogVisible.value = false
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

:deep(.el-input__inner ){
  font-size: 12px !important
}

:deep(.el-button>span) {
  font-size: 12px !important
}
</style>