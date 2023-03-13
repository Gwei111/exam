<template>
  <div class="boxx">
    <el-page-header @back="hui">
      <template #content>
        <h4> {{ data.title }} </h4>
      </template>
    </el-page-header>
  </div>
  <div class="cen_inp">
    <div class="sel">
      <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="考生姓名" prop="age">
          <el-input v-model="numberValidateForm.key" placeholder="请输入考生姓名" type="text" autocomplete="off" />
        </el-form-item>
      </el-form>
    </div>&emsp;
    <span style="margin-top:5px;color:gray">状态：</span>
    <el-select v-model="numberValidateForm.state" class="m-2" placeholder="全部">
      <el-option v-for="item in slect" :key="item.value" :label="item.label" :value="item.label" />
    </el-select>&emsp;
    <div class="m-4">
      <span>部门</span>&nbsp;
      <el-cascader v-model="date.depid" id="sele" :options="options.arr" @change="handleChange" :props="propsAAA"
        clearable />
    </div>&nbsp;
    <span style="margin-top:5px;color:gray;"> 班级：</span>
    <el-select v-model="value1" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>&emsp;
    <el-button type="primary" @click="chai">查询</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="depname" label="班级名称" />
    <el-table-column prop="scores" label="分数" />
    <el-table-column prop="readtime" label="考试时间">
      <template #default="scope">
        <p>
          {{scope.row.readtime==null?'':moment(scope.row.readtime).format('YYYY-MM-DD hh:mm') }}
        </p>
      </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template #default="scope">
          <span>{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="read(scope.row)"> 阅卷 </el-button>
        </template>
      </el-table-column>

  </el-table>
  <!-- 使用分页组件 -->
  <div class="page" style="width: 600px; margin: 30px auto;">
      <FenYe :counts="counts" @getChildData="getChildData" />

    </div>  <TestPaper v-if="data.isOpen" @GetStuDentList="GetStuDentList"></TestPaper>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, provide, toRefs } from "vue";
import type { FormInstance } from "element-plus";
import { StuDentList, GetList, List } from "../../api/ExamPapers/Exam";
import moment from "moment";
// 导入分页组件
import FenYe from "../../components/FenYe/FenYe.vue"
import TestPaper from "../test/testPaper.vue";
import { useRouter } from "vue-router"
import { useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute();
const formRef = ref<FormInstance>();

const data: any = reactive({
  // 是否打开弹框
  isOpen: false,
  small: false,
  background: false,
  disabled: false,
  props: {
    checkStrictly: true,
    value: "id",
    label: "name",
    children: "children",
  },
  // 部门列表数据
  optionsDepartment: [],
  // 班级列表
  optionsClass: [{ id: '', name: '' }],
  // 加载
  loading: true,
  // 数据总条数
  counts: 0,
  title: "",
  // 请求列表数据
  params: {
    testid: 0,
    page: 1,
    psize: 10,
    state: "",
    key: "",
    depid: null,
    classid: null
  },
  // 列表数据
  tableData: [],
  checkedData: {}
});
// 传给字组件的数据
provide('data', data)
const { params } = toRefs(data)
params.value.testid = route.query.id
// data.title=route.query.name
const numberValidateForm: any = reactive({
  testid: route.query.id,
  state: '',
  key: ''
});
// 查询
const chai = () => {
  GetStuDentList();
}

const value = ref("");
const value1 = ref("");

const options: any = reactive({ arr: [] });
interface User {
  date: string;
  name: string;
  address: string;
}
const handleChange = (val: any) => {
  date.depid = val[toRaw(val).length - 1];
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
  let res: any = await GetList(date);
  options.arr = res.data.list;
  // console.log(options.arr);
};
partmentlist()
// 列表
const tableData: any = ref([]);
const counts = ref()
const GetStuDentList = async () => {
  let res: any = await StuDentList(numberValidateForm);
  console.log(res);
  if (res.errCode === 10000) {
    tableData.value = res.data.list;
    counts.value = res.data.counts
  }
};
GetStuDentList();

// 分页
const getChildData = (val: any) => {
  numberValidateForm.page = val.page;
  numberValidateForm.psize = val.psize;
  GetStuDentList();
};

const slect = [
  {
    value: '1',
    label: '已阅卷',
  },
  {
    value: '2',
    label: '未阅卷',
  },
]
const hui = () => {
  router.push("/exam")
}
// 阅卷
const read = (e: any) => {
  // console.log(e);
  data.isOpen = true
  data.checkedData = e

}
</script>

<style scoped>
@import url("../../assets/css/Exam/EXam2.css");
</style>