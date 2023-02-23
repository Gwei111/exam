<template>
  <div class="box">
    <div class="topbox">
      <h3>考试管理</h3>
      <el-button type="primary">创建考试</el-button>
    </div>
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="formInline.user" placeholder="考试名称" />
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="formInline.user" placeholder="创建人" />
        </el-form-item>

        <el-form-item>
          <el-checkbox label="我创建的" name="type" />
        </el-form-item>
        <el-form-item label="开放时间" prop="resource">
          <el-radio-group v-model="formInline.user">
            <el-radio label="永久开放" />
            <el-radio label="部分时段" />
          </el-radio-group>
          <el-date-picker v-model="formInline.user" type="daterange" unlink-panels range-separator="To"
            start-placeholder="Start date" end-placeholder="End date" :shortcuts="shortcuts" :size="size" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="所有" value="shanghai" />
            <el-option label="未发布" value="beijing" />
            <el-option label="已发布" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <div v-show=" block !==0">
          <el-form-item>
            <el-button type="danger" @click="onSubmit">批量删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发布考试</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit">取消发布</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="list">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%, " @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column label="考试名称" width="180" prop="title">
          <template #default="scope">
            <span @click="getDetails(scope.row.id,scope.row.title)">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template #default="scope">
            <span :class="
              scope.row.state == 0 || scope.row.state == 1 ? 'blues' : 'reds'">
              {{ scope.row.state === 0 ? '所有' : scope.row.state === 1 ? '已发布' : '未发布' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column property="scores" label="总分" width="120" />
        <el-table-column property="pastscores" label="通过分数" width="180" />
        <el-table-column property="studentcounts" label="考试人数" width="180" />
        <el-table-column property="pastnum" label="通过人数" width="180" />
        <el-table-column property="name" label="开放时间" width="180">
          <template #default="scope">
            <p v-if="scope.row.begindate == null">不限</p>
            <p v-else>
              {{ moment(scope.row.begindate).format('YYYY-MM-DD hh:mm') }}至
              {{ moment(scope.row.enddate).format('YYYY-MM-DD hh:mm') }}

            </p>
          </template>
        </el-table-column>
        <el-table-column property="admin" label="创建人" width="180" />
        <el-table-column property="addtime" label="更新时间" width="180">
          <template #default="scope">
            <p>
              {{ moment(scope.row.addtime).format('YYYY-MM-DD hh:mm:ss') }}

            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope" class="action">
            <!-- <el-button size="small"  text @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
            <span>学生</span>
            <el-divider direction="vertical" />
            <span>可见</span>
            <el-divider direction="vertical" />
            <span>阅卷老师</span>
            <el-divider direction="vertical" />
            <span>分析</span>
            <el-divider direction="vertical" />
            <span>编辑</span>
            <el-divider direction="vertical" />
            <span class="red"  @click="handleDelete(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 考试详情 -->
      <TestDetails :dialogVisible="dialogVisible" v-if="dialogVisible==true" @closedetailsList="closedetailsList" :getid="getid" :title="title"></TestDetails>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { testList,testDel } from '../../api/test'
import { ElMessageBox } from 'element-plus'
import  TestDetails  from "../../components/test/testDetails.vue";
import moment from "moment";
import { MessageBox } from '@element-plus/icons-vue';
const formInline = reactive({
  user: '',
  region: '',
})
let getid=ref(0)
let title=ref('')
const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
const size = ref<'default' | 'large' | 'small'>('default')
interface User {
  date: string
  name: string
  address: string
}
const dialogVisible = ref(false)//弹框
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
let block=ref(0)
const handleSelectionChange = (val: User[]) => {
 block.value = val.length
  
}

const tableData: any = ref([])
// 获取列表
const getList = async () => {
  let res: any = await testList({})
  // console.log(res);
  if (res.errCode === 10000) {
    tableData.value = res.data.list
  }

}
getList()
const onSubmit = () => {
  console.log('submit!')
}
// 弹窗
const getDetails=(id:any,titles:any)=>{
    dialogVisible.value=true
    getid.value=id
    titles=title
}
// 详情
let closedetailsList = (val:boolean) => {
  console.log(val);
  dialogVisible.value = val
}
// 单删删除
const handleDelete = async(val:any) => {
  // console.log(val)
  let res:any=await testDel({id:val})
  // console.log(res);
  if(res.errCode==10000){
    ElMessage.success('删除成功')
    getList()
  }
  
}
</script>

<style scoped lang="less">
.box {
  margin: 10px;
  padding: 0;

  .topbox {
    display: flex;
    justify-content: space-between;

    h3 {
      font-weight: normal;
    }
  }


  .top {
    margin-top: 10px;
  }

  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin: 0 7px;
    /* vertical-align: middle; */
    position: relative;
    border-left: 1px var(--el-border-color) var(--el-border-style);
  }

  .el-table .cell span {
    color: #4290f7;
  }

  .el-table .cell .red {
    color: red;
  }


}

.reds {
  font-size: 13px;
  color: rgb(245, 72, 72) !important
}
</style>