<template>
  <div>
    <h3>阅卷</h3>
  </div>
  <div class="box" style="width:350px;margin-left:-30px;margin-top:10px">
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="关键字：" prop="key">
        <el-input v-model.number="numberValidateForm.key" placeholder="请输入题库名称" type="text" autocomplete="off" />
      </el-form-item>
    </el-form>
    &emsp;<el-button type="primary" @click="seach">查询</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="试卷名称" />
    <el-table-column prop="info" label="试卷说明" />
    <el-table-column prop="subjectnum" label="题量" />
    <el-table-column prop="studentcounts" label="考试人数" />
    <el-table-column prop="isread" label="未判人数">
      <template #default="scope">
        <span class="hon"> {{ scope.row.incomplete }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="addtime" label="开放时间">
      <template #default="scope">
        <p>
          {{ moment(scope.row.addtime).format('YYYY-MM-DD hh:mm') }}
        </p>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button link type="primary" @click="questions(scope.row)">
          {{ scope.row.incomplete == 0 ? "查看" : "阅卷" }}</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 使用分页组件 -->
  <div class="page" style="width: 600px; margin: 30px auto;">
    <FenYe :counts="counts" @getChildData="getChildData" />

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// 导入分页组件
import FenYe from "../../components/FenYe/FenYe.vue";
import type { FormInstance } from "element-plus";
import { List } from "../../api/ExamPapers/Exam";
import { useRouter } from "vue-router";
import moment from 'moment'
const router = useRouter();
const formRef = ref<FormInstance>();
const numberValidateForm = reactive({
  isread: "1",
  key: "",
  page: 1,
  psize: 10
});
const tableData = ref([]);
const counts = ref(0);
const GetList = async () => {
  let res: any = await List(numberValidateForm);
  console.log(res);
  if (res.errCode === 10000) {
    tableData.value = res.data.list;
    // Object.assign(tableData, res.data.list);
    counts.value = res.data.counts;
    console.log(tableData.value);
  }
};
GetList();
// 点击阅卷跳转
const questions = (val: any) => {
  console.log(val);
  router.push({ path: "/examinationA", query: { id: val.id, name: val.title } });
  // router.push({ name: "examinationA", state:{params: id }});
  console.log({ path: "/examinationA", query: { name: val.title, id: val.id } });
};
// 分页
const getChildData = (val: any) => {
  numberValidateForm.page = val.page;
  numberValidateForm.psize = val.psize;
  GetList();
};
// 查询
const seach = () => {
  GetList();
};
</script>

<style scoped>
@import url("../../assets/css/Exam/ExamPapers");

h3 {
  font-weight: normal;
}
</style>