<template>
  <div class="boxx">
    <el-page-header @back="hui">
    <template #content>
      <span class="text-large font-600 mr-3"> {{ data.title }} </span>
    </template>
  </el-page-header>
  </div>
  <div class="cen_inp">
    <div class="sel">
      <el-form ref="formRef"
               :model="numberValidateForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="考生姓名"
                      prop="age">
          <el-input v-model.number="numberValidateForm.age"
                    placeholder="请输入考生姓名"
                    type="text"
                    autocomplete="off" />
        </el-form-item>
      </el-form>

    </div>&emsp;
    <span style="margin-top:5px;color:gray">状态：</span>
    <el-select v-model="numberValidateForm.state"
               class="m-2"
               placeholder="全部">
      <el-option v-for="item in slect"
                 :key="item.value"
                 :label="item.label"
                 :value="item.label" />
    </el-select>&emsp;
    <div class="m-4">
      <span>部门</span>&nbsp;
      <el-cascader v-model="date.depid"
                   id="sele"
                   :options="options.arr"
                   @change="handleChange"
                   :props="propsAAA" />
    </div>&nbsp;
    <span style="margin-top:5px;color:gray;"> 班级：</span>
    <el-select v-model="value1"
               disabled
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value" />
    </el-select>&emsp;
    <el-button type="primary" @click="chai">查询</el-button>
  </div>
  <el-table :data="tableData"
            style="width: 100%">
    <el-table-column prop="name"
                     label="姓名"
                     width="180" />
    <el-table-column prop="depname"
                     label="班级名称"
                     width="180" />
    <el-table-column prop="scores"
                     label="分数"
                     width="180" />
    <el-table-column prop="readtime"
                     label="考试时间"
                     width="180" />
    <el-table-column prop="state"
                     label="状态"
                     width="180" />
    <el-table-column prop="name"
                     label="操作"
                     width="180">
                     <template #default="scope">
            <el-button link type="primary" size="small"> 阅卷 </el-button>
          </template>
    </el-table-column>

  </el-table>
  <!-- 使用分页组件 -->
  <FenYe :counts="counts"
         @getChildData="getChildData" />
</template>

<script setup lang="ts">
import { reactive, ref ,toRaw} from "vue";
import type { FormInstance } from "element-plus";
import { StuDentList ,GetList,List} from "../../api/ExamPapers/Exam";
// 导入分页组件
import FenYe from "../../components/FenYe/FenYe.vue"
import {useRouter} from "vue-router"
import {useRoute} from 'vue-router';
const router=useRouter()
const route = useRoute();
const formRef = ref<FormInstance>();

const data:any=reactive({
  id:'',
  title:''
})
data.id=route.query.id
data.title=route.query.name
const numberValidateForm:any = reactive({
  testid: route.query.id,
  state:''
});
// 查询
const chai=()=>{
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
const tableData:any = ref([]);
const counts=ref()
const GetStuDentList = async () => {
  let res :any= await StuDentList(numberValidateForm);
  console.log(res);
  if (res.errCode === 10000) {
    tableData.value = res.data.list;
    counts.value=res.data.counts
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
const hui=()=>{
  router.push("/subjects")
}

</script>

<style scoped>
@import url("../../assets/css/Exam/EXam2.css");
</style>