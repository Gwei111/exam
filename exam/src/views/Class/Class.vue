<template>
  <div id="head">
    <span class="cla_he">班级页面</span>
    <el-button @click="clasAdd"
               type="primary">
      添加班级
    </el-button>

  </div>
  <div class="Class_inp">
    <el-form :model="numberValidateForm"
             ref="formRef"
             class="demo-ruleForm">
      <el-form-item label="班级姓名"
                    prop="key">
        <el-input placeholder="请输入关键字"
                  v-model="numberValidateForm.key"
                  type="text" />
      </el-form-item>&emsp;
      <div class="m-4">
        <p>班级部门</p>&emsp;
        <el-cascader :options="options"
                     :props="props1"
                     clearable />
      </div>
      &emsp;&emsp;<el-button type="primary"
                 @click="Search">查询</el-button>
    </el-form>
    <el-button type="danger"
               @click="delAll" v-show="multipleSelection.length > 0">批量删除</el-button>
    <el-table ref="multipleTableRef"
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55" />
      <el-table-column label="班级名称"
                       property="name"
                       width="600"
                       align="center">
      </el-table-column>
      <el-table-column property="depname"
                       label="部门"
                       align="center"
                       width="600" />
      <el-table-column width="200"
                       label="操作">
        <template #default="scope">

          <el-button type="danger"
                     link
                     @click="del(scope.row.id)">删除</el-button>
          <el-button type="success"
                     link
                     @click="updata(scope.row)">修改

          </el-button>

        </template>
      </el-table-column>

    </el-table>
    <!-- 点击添加弹出框 -->
    <el-dialog v-model="dialogVisible"
               :title="textss===true ? '添加' : '修改'"
               width="40%"
               :before-close="handleClose">
      <ClaUpdate @close='close'
                 :upAata="upAata"></ClaUpdate>
    </el-dialog>
    <!-- 分页 -->
    <FenYe :counts="counts"
           @getChildData="getChildData" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import ClaUpdate from "../../components/ClaUpdate.vue";
import FenYe from "../../components/FenYe/FenYe.vue"
import { ElMessage, ElMessageBox } from "element-plus";
import { Class_List, DelList, getDelAll } from "../../api/Class/list";
import type { Action } from "element-plus";
import { ElTable } from "element-plus";
import { Loading } from "element-plus/es/components/loading/src/service";

const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  key: "",
  page:"",
  psize:""
});
const props1 = {
  checkStrictly: true,
};
const options = [
  {
    value: "guide",
    label: "Guide",
  },
];

interface User {
  date: string;
  name: string;
  address: string;
}
const tableData: User[] = reactive([]);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
  // 获取到数据  处理数据得到id
  multipleSelection.value = val.map((item: any) => item.id);
  // console.log(multipleSelection.value);
};
// 批量删除
const delAll = async () => {
  let req = { ids: multipleSelection.value };
  let res = await getDelAll(req);
  // console.log(res);
  if (res.errCode === 10000) {
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    GetClass_List();
  } else {
    ElMessage({
      message: "删除失败",
      type: "error",
    });
  }
};
const counts = ref(0);
// 请求班级列表数据接口
const GetClass_List = async () => {
  let res = await Class_List(numberValidateForm);
  console.log(res);
  if (res.errCode === 10000) {
    Object.assign(tableData, res.data.list);
    // console.log(tableData);
    counts.value=res.data.counts
  }
};
GetClass_List();
// 查询
const Search = () => {
  GetClass_List();
};
// 单独删除一条数据
const del = (id: any) => {
  ElMessageBox.confirm("您确定删除这条数据吗?", "删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const params = {
        id: id,
      };
      const res = await DelList(params);
      // console.log(res);
      if (res.errCode === 10000) {
        GetClass_List();
      }
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除失败",
      });
    });
};
const dialogVisible = ref(false);
// 添加修改
const textss = ref(true);
const clasAdd = () => {
  textss.value = true;
  dialogVisible.value = true;
};
//修改按钮
const upAata = ref();
const updata = (e: any) => {
  textss.value = false;
  upAata.value = e;
  dialogVisible.value = true;
};
//请求成功后关闭弹框
const close = (e: boolean) => {
  dialogVisible.value = e;
  GetClass_List();
};

// 分页
const getChildData = (val: any) => {
  console.log(111, val)
  numberValidateForm.page = val.page;
  numberValidateForm.psize = val.psize;
  console.log(numberValidateForm.psize, numberValidateForm.page,1234);
  
 GetClass_List();
};
</script>

<style scoped>
@import url("../../assets/css/Class/Class.css");
</style>