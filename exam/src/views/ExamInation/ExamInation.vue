<template>
  <div class="box">
    <div class="topbox">
      <h3>考试管理</h3>
      <el-button type="primary" @click="router.push('./testadd')">创建考试</el-button>
    </div>
    <div class="top">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="query.key" placeholder="考试名称" size="mini" clearable />
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="query.admin" placeholder="创建人" clearable />
        </el-form-item>
        <!-- 我创建的 -->
        <el-form-item>
          <el-checkbox label="我创建的" v-model="query.ismy"  true-label="1"
            false-label="0" @change="changeismy"/>
        </el-form-item>
        <el-form-item label="开放时间" prop="resource">
          <el-radio-group v-model="radio">
            <el-radio :label="1" value="1">永久开放</el-radio>
            <el-radio :label="2" value="2" >部分时段</el-radio>
          </el-radio-group>
          <el-date-picker v-model="times" type="daterange" unlink-panels range-separator="To" start-placeholder="开始时间"
            end-placeholder="结束时间" :shortcuts="shortcuts" :size="size" :readonly="flag==false"  @change="changepi"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="stateVal" clearable placeholder="选择状态" style="width: 100px" @change="changeState">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Search">查询</el-button>
        </el-form-item>
        <div v-show="block !== 0">
          <el-form-item>
            <el-button type="danger" @click="delAll">批量删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="issue">发布考试</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="noissue">取消发布</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="list">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%, " size="small"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column label="考试名称" prop="title">
          <template #default="scope">
            <span @click="getDetails(scope.row.id, scope.row.title)" v-html="scope.row.title">

            </span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <span :class="
              scope.row.state == 0 || scope.row.state == 1 ? 'blues' : 'reds'">
              {{ scope.row.state === 0 ? '所有' : scope.row.state === 1 ? '已发布' : '未发布' }}
            </span>
          </template>
        </el-table-column>

        <el-table-column property="scores" label="总分" align="center" />
        <el-table-column property="pastscores" label="通过分数" align="center" />
        <el-table-column property="studentcounts" label="考试人数" align="center" />
        <el-table-column property="pastnum" label="通过人数" align="center" />
        <el-table-column property="name" label="开放时间" align="center">
          <template #default="scope">
            <p v-if="scope.row.begintime && scope.row.endtime"
              >{{ moment(scope.row.begindate).format('YYYY-MM-DD hh:mm') }}至
              {{ moment(scope.row.enddate).format('YYYY-MM-DD hh:mm') }}</p
            >
            <p v-else>不限</p>
          </template>
        </el-table-column>
        <el-table-column property="admin" label="创建人" align="center" />
        <el-table-column property="addtime" label="更新时间" align="center">
          <template #default="scope">
            <p>
              {{ moment(scope.row.addtime).format('YYYY-MM-DD hh:mm') }}
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope" class="action">
            <span @click="getstudent(scope.row.id)">学生</span>
            <el-divider direction="vertical" />
            <span @click="getTeacher(scope.row.id)">可见</span>
            <el-divider direction="vertical" />
            <span @click="dialogyueTeacher = true">阅卷老师</span>
            <el-divider direction="vertical" />
            <span @click='getAnalyse(scope.row)'>分析</span>
            <el-divider direction="vertical" />
            <span @click="upd(scope.row.id, scope.row)">编辑</span>
            <el-divider direction="vertical" />
            <span class="red" @click="handleDelete(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="width: 600px; margin: 30px auto;">
        <Pages @getChildData="getChildData" :counts="totals"></Pages>
      </div>
      <!-- 考试详情 -->
      <TestDetails :dialogVisible="dialogVisible" v-if="dialogVisible == true" @closedetailsList="closedetailsList"
        :getid="getid" :title="title"></TestDetails>
      <!-- 学生列表 -->
      <el-dialog title="可见学生" v-model="dialogstudent" width="40%">
        <Students :dialogstudent="dialogstudent" v-if="dialogstudent == true" @studentCancel="studentCancel"
          @studentConfirm="studentConfirm" @studentClose="studentClose"></Students>
      </el-dialog>

      <!-- 可见老师 -->
      <el-dialog title="可见老师" v-model="dialogTeacher" width="40%">
        <Teacher :dialogTeacher="dialogTeacher" v-if="dialogTeacher == true" @teacherConfirm="teacherConfirm"
          @teacherClose="teacherClose"></Teacher>
      </el-dialog>
      <!-- 阅卷老师 -->
      <el-dialog title="阅卷老师" v-model="dialogyueTeacher" width="40%">
        <TascherList :dialogyueTeacher="dialogyueTeacher" v-if="dialogyueTeacher == true" @teacherCancel="teacherCancel"
          @teacherConfirm="yueteacherConfirm"></TascherList>
      </el-dialog>

    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, toRefs ,watchEffect} from "vue";
import { ElMessage, ElTable } from "element-plus";
import router from "../../router/index";

import {
  testList,
  testDel,
  testDelAll,
  testState,
  departmentList,
} from "../../api/test";
import { ElMessageBox } from "element-plus";
import TestDetails from "../../components/exam/testDetails.vue";
import Students from "../../components/test/studentList.vue";
import moment from "moment";
import Pages from '../../components/FenYe/FenYe.vue'
import Teacher from '../../components/test/teacherList.vue'
import TascherList from '../../components/test/teacherList.vue'//阅卷老师
let getid = ref(0)
let title = ref('')
const data: any = reactive({
  stateVal: "", //状态
  times: "", //时间
  timeRadio: "1",
  options: [
    //表单状态的数据
    {
      value: "0",
      label: "所有",
    },
    {
      value: "1",
      label: "已发布",
    },
    {
      value: "2",
      label: "未发布",
    },
  ],
});
const { stateVal, times, timeRadio, options } = toRefs(data);
let query: any = reactive({
  //掉接口数据
  page: 1,
  psize: 8,
  key: "",
  admin: "",
  opentime: "",
  state: 0,
  ismy:0
});
const radio = ref(1);
const flag = ref(false);
watchEffect(() => {
  radio.value === 2 ? (flag.value = true) : (flag.value = false);
});
const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
const size = ref<"default" | "large" | "small" | 'mini'>("default");
const changepi=(e:any)=>{
  // console.log(e)
  query.begindate = moment(e[0]).format('YYYY-MM-DD');
  query.enddate = moment(e[1]).format('YYYY-MM-DD');
  // console.log(query.value)
}
interface User {
  date: string;
  name: string;
  address: string;
}
const dialogVisible = ref(false); //弹框
const dialogstudent = ref(false); //学生列表
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
let block = ref(0);
let addId = ref([]); //批删id
const handleSelectionChange = (val: any) => {
  // console.log(val);
  block.value = val.length;
  addId.value = val.map((item: any) => item.id);
  console.log(addId.value);
};

const tableData: any = ref([]);
// 获取列表
const getList = async () => {
  let res: any = await testList(query);
  // console.log(res);
  if (res.errCode === 10000) {
    tableData.value = res.data.list;
    totals.value = res.data.counts;
  }
};
getList();
const Search = () => {
  getList();
};
let totals = ref(0);
// 分页
const getChildData = (val: any) => {
  // console.log(val);
  (query.page = val.page), (query.psize = val.psize);
  getList();
};
// 状态搜索
const changeState = (val: any) => {
  console.log(val, 111);
  query.state = Number(val);
};
// 发布状态
const issue = async () => {
  let res: any = await testState({ state: 1, ids: addId.value });
  // console.log(res);
  if (res.errCode == 10000) {
    ElMessage.success("修改成功");
    getList();
  }
};
// 取消发布
const noissue = async () => {
  let res: any = await testState({ state: 2, ids: addId.value });
  // console.log(res);
  if (res.errCode == 10000) {
    ElMessage.success("修改成功");
    getList();
  }
};
const changeismy = (val:any) => {
  console.log(val);
  
  if (val === 1) {
    query.admin = "";
  }
};
// 开放时间
const changeRadio = (val: any) => {
  // console.log(val);
  query.opentime = Number(val);
  console.log(query.opentime);
};
// 详情弹窗
const getDetails = (id: any, titles: any) => {
  console.log(titles);

  dialogVisible.value = true;
  getid.value = id;
  title = titles;
};
// 详情
let closedetailsList = (val: boolean) => {
  console.log(val);
  dialogVisible.value = val;
};
// 单删删除
const handleDelete = async (val: any) => {
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
      let res: any = await testDel({ id: val });
      // console.log(res);
      if (res.errCode == 10000) {
        ElMessage.success("删除成功");
        getList();
      }
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '已取消删除',
      })
    })

};

// 批删
const delAll = async (val: any) => {
  // console.log(val);
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
      let res: any = await testDelAll({ ids: addId.value });
      // console.log(res);
      if (res.errCode === 10000) {
        ElMessage.success("删除成功");
        getList();
      }
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '已取消删除',
      })
    })

};

let testid = ref(0);
// 学生弹框
const getstudent = (id: any) => {
  dialogstudent.value = true;
  testid.value = id;
};
// 点击关闭弹框
const studentClose = (val: any) => {
  dialogstudent.value = val;
};
// d点确认按钮
const studentConfirm = (val: any) => {
  dialogstudent.value = val;
};
// 点击学生完成按钮
const studentCancel = (val: any) => {
  dialogstudent.value = val;
};
// 老师弹框
let dialogTeacher = ref(false);
const getTeacher = (val: any) => {
  dialogTeacher.value = true;
};
// 老师点击确认
const teacherConfirm = (val: any) => {
  dialogTeacher.value = val;
};

// 阅卷老师点击4
const yueteacherConfirm = (val: any) => {
  dialogyueTeacher.value = val;
}
// 老师点击关闭
const teacherClose = (val: any) => {
  dialogTeacher.value = val;
};
// 老师点击取消
const teacherCancel = (val: any) => {
  dialogTeacher.value = val
}

// 阅卷老师弹框
const dialogyueTeacher = ref(false)

// 点击编辑 
const upd = (id: any, val: any) => {
  // console.log(id,val);
  if (val.studentcounts == 0) {
    router.push({ path: '/testadd', query: { id: id } })
  } else {
    ElMessage({
      message: '本场有学生参加考试，不可编辑',
      type: 'error'
    })
  }
}
// 分析
const getAnalyse = (val: any) => {
  console.log(val);
  if (val.studentcounts == 0) {
    ElMessage.error('没有学生考试')
  } else if (val.isread == 1) {
    ElMessage.error('本场考试还未判完卷')
  } else {
    router.push({ path: './Analyse', query: { id: val.id } })
  }

}
</script>

<style scoped lang="less">
.box {
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
  color: rgb(245, 72, 72) !important;
}

// /deep/.el-table .el-table__cell{
//   padding: 0!important
// }
/deep/.el-radio-group {
  width: 200px !important
}

/deep/.el-input {
  font-size: 5px;
  width: 100px;
}

/deep/.el-radio {
  margin-right: 10px;
}

/deep/.el-input__wrapper {
  width: 190px;
}

/deep/.el-table--enable-row-transition .el-table__body td.el-table__cell {
  font-size: 13px;
}
</style>