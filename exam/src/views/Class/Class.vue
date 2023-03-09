<template>
  
  <div id="head">
    <h3>班级页面</h3>
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
        <p>部门</p>&emsp;
        <el-cascader v-model="date.depid"
                     :options="options.arr"
                     @change="handleChange"
                     :props="propsAAA" />
      </div>
      &emsp;&emsp;<el-button type="primary"
                 @click="Search">查询</el-button>
    </el-form>
    <el-button type="danger"
               @click="delAll"
               v-show="multipleSelection.length > 0">批量删除</el-button>
    <el-table ref="multipleTableRef"
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55" />
      <el-table-column label="班级名称"
                       property="name"
                       width="500"
                       align="center">
      </el-table-column>
      <el-table-column property="depname"
                       label="部门"
                       align="center"
                       width="500" />
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
               width="40%">
      <ClaUpdate @close='close'
                 @cencell='cencell'
                 :upAata="upAata"></ClaUpdate>
    </el-dialog>
    <!-- 分页 -->
    <FenYe :counts="counts"
           @getChildData="getChildData" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import type { FormInstance } from "element-plus";
import ClaUpdate from "../../components/ClaUpdate.vue";
import FenYe from "../../components/FenYe/FenYe.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { departmentlist } from "../../api/department";
import { Class_List, DelList, getDelAll } from "../../api/Class/list";
import type { Action } from "element-plus";
import { ElTable } from "element-plus";
import Drower from "../../components/Drower.vue";
const formRef = ref<FormInstance>();
const numberValidateForm = reactive({
  key: "",
  page: "",
  psize: "",
});
const props1 = {
  checkStrictly: true,
};
const options: any = reactive({ arr: [] });
interface User {
  date: string;
  name: string;
  address: string;
}
const tableData:any = ref([]);
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const drawer = ref(false);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
  // 获取到数据  处理数据得到id
  multipleSelection.value = val.map((item: any) => item.id);
};
// 批量删除
const delAll = async () => {
  let req = { ids: multipleSelection.value };
  let res: any = await getDelAll(req);
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
  let res: any = await Class_List(numberValidateForm);
  console.log(res);
  if (res.errCode === 10000) {
    tableData.value = res.data.list;
    counts.value = res.data.counts;
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
      const res: any = await DelList(params);
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
  upAata.value=''
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
  numberValidateForm.page = val.page;
  numberValidateForm.psize = val.psize;
  GetClass_List();
};
// 三级联动部门列表
const date: any = reactive({
  page: "",
  psize: "",
  depid: "",
  rolename: "", // 角色
});
const propsAAA = ref({
  value: "id",
  label: "name",
  children: "children",
});

const partmentlist = async () => {
  let res: any = await departmentlist(date);
  options.arr = res.data.list;
  console.log(options.arr);
};
partmentlist();
const handleChange = (val: any) => {
  date.depid = val[toRaw(val).length - 1];
};
// 取消按钮
const cencell = () => {
  dialogVisible.value = false;
};

const Drawerclose=(val:any)=>{
console.log(val); 

}
</script>

<style scoped>
@import url("../../assets/css/Class/Class.css");
h3{
  font-weight: normal;
}
</style>