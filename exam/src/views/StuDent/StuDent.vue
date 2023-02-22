<template>
  <div class="box">
    <div class="top">
      <h3>学员管理</h3>
      <div>
      <el-button plain>批量添加</el-button>
      <el-button type="primary">添加学生</el-button>
      </div>
    </div>
    <div class="input">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input  placeholder="考试名称" />
        </el-form-item>
        <el-form-item label="部门">
          <el-select  placeholder="请选择">
            <el-option label="所有" value="shanghai" />
            <el-option label="未发布" value="beijing" />
            <el-option label="已发布" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select  placeholder="请选择">
            <el-option label="所有" value="shanghai" />
            <el-option label="未发布" value="beijing" />
            <el-option label="已发布" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
          <el-form-item>
            <el-button type="danger" >批量删除</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column property="name" label="学生姓名"/>
        <el-table-column property="remarks" label="备注"/>
        <el-table-column property="depname" label="所属部门"/>
        <el-table-column property="classname" label="所在班级" />
        <el-table-column property="username" label="账号"/>
        <el-table-column property="addtime" label="添加时间"/>
        <el-table-column label="操作" show-overflow-tooltip >
          <span class="font" >重置密码</span>
            &nbsp;
          <span class="font" >修改</span>
            &nbsp;
            <span class="font">删除</span>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElTable } from 'element-plus'
import { studentList } from '../../api/student';

onMounted(() => {
  getStudentList()
})

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
const handleSelectionChange = (val:any) => {
  multipleSelection.value = val
}

const tableData:any =ref([])
const getStudentList = async () => {
  const res: any = await studentList({})
  // console.log(res.data.list);
  if (res.errCode == 10000) {
    tableData.value = res.data.list
    
  }

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
    div{
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
/deep/.el-input__inner{
  font-size: 12px!important
}
/deep/.el-button>span{
  font-size: 12px!important
}
</style>